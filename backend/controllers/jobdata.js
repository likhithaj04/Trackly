const Job=require('../model/jobSchema')
const axios=require('axios');
const pdfparse = require("pdf-parse");
const multer=require('multer')
const mongoose=require('mongoose')
const fs = require("fs");
const { cloudinary } = require('../cloudconfig'); // adjust path if needed
const job = require('../model/jobSchema');
const ReportCache=require('../model/reportCache')
const crypto = require('crypto');

module.exports.addJobData = async (req, res) => {
  const { company, role, summary } = req.body;

  if (!req.file) return res.status(400).send("No file attached");

  // Parse PDF once, upfront
  const pdfData = await pdfparse(req.file.buffer);
  const resumeText = (pdfData.text || '').slice(0, 3000);

  // Hash the file to use as a stable Cloudinary public_id
  const fileHash = crypto
    .createHash('md5')
    .update(req.file.buffer)
    .digest('hex');

  // Run AI call and Cloudinary upload in parallel
  const [outreach, uploadResult] = await Promise.all([

    // AI call — unchanged
    axios.post(process.env.AI_URL, {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You write concise, personalized job outreach messages." },
        {
          role: "user",
          content: `
You must ONLY use information explicitly found in the resume below.

Task:
1. Extract 1–2 real skills or projects mentioned in the resume.
2. Use ONLY those extracted details to write a short outreach message.

Resume:
${resumeText}

Job Details:
Company: ${company}
Role:${role}
Summary: ${summary}

Strict Rules:
- DO NOT assume or invent skills (e.g., MERN, React) unless they appear in the resume
- DO NOT use generic praise (e.g., "impressive background", "strong profile")
- DO NOT repeat the full resume
- Use exactly 1–2 specific skills or projects from the resume
- Keep it under 80 words
- Make it sound natural and human

Output:
Only return the final outreach message. No explanations.
`  
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }),

    // Cloudinary upload — using hash as public_id prevents duplicate uploads
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'TRACKLY',
          resource_type: 'raw',
          format: 'pdf',
          public_id: fileHash,        
          overwrite: false,           
        },
        (error, result) => error ? reject(error) : resolve(result)
      );
      stream.end(req.file.buffer);
    })
  ]);

  const message = outreach.data.choices[0].message.content;
  const resumeUrl = uploadResult.secure_url;

  const job = new Job({
    company, role, summary,
    outreachmsg: message,
    resumeUrl,
    user: req.user.id
  });
  await job.save();

  res.send({ success: true, outreachmsg: message, resumeUrl });
};

//add job

module.exports.jobs = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized"
    });
  }

  const job = await Job.find({
    user: req.user.id
  });

  res.send({
    success: true,
    data: job
  });
};




//Report
const REPORT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours — tune to your liking

function hashJobs(jobs) {
  // Stable fingerprint of the job list — any change busts the cache
  const stable = jobs.map(j => ({
    id: j._id.toString(),
    status: j.status,
    appliedAt: j.appliedAt?.toISOString(),
    statusDate: j.statusDate?.toISOString(),
  }));
  return crypto
    .createHash('md5')
    .update(JSON.stringify(stable))
    .digest('hex');
}

module.exports.report = async (req, res) => {
  
  const jobs = await Job.find({ user: req.user.id });

  if (!jobs || jobs.length === 0) {
    return res.status(404).json({ success: false, message: 'No jobs found' });
  }

  const currentHash = hashJobs(jobs);
  const now = Date.now();

  // Check cache
  const cached = await ReportCache.findOne({ user: req.user.id });

  if (cached) {
    const isFresh = now - cached.generatedAt.getTime() < REPORT_TTL_MS;
    const isUnchanged = cached.jobsHash === currentHash;

    if (isFresh && isUnchanged) {
      return res.json({ success: true, report: cached.report, fromCache: true });
    }
  }

  // Cache miss or stale/changed — call AI
  const cleanedJobs = jobs.map(job => ({
    company: job.company,
    role: job.role,
    status: job.status,
    appliedDate: job.appliedAt,
    interviewDate: job.statusDate,
  }));

  const response = await axios.post(process.env.AI_URL, {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: 'You are a helpful career assistant.' },
      { role: 'user', content:`You are an intelligent career tracking assistant.

Analyze the following user job application data and generate a professional weekly report.

The report must include:

1. Total applications
2. Status breakdown
3. Recent activity summary
4. Upcoming interviews or assessments
5. Insights and observations
6. Suggestions for improvement
7. Motivational closing summary

Keep the report:
- concise
- professional
- supportive
- easy to read

Return response in markdown format.

Job Data:
${JSON.stringify(cleanedJobs, null, 2)}
`
}
    ],
    temperature: 0.7,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const report = response.data.choices[0].message.content;

  // Upsert cache
  await ReportCache.findOneAndUpdate(
    { user: req.user.id },
    { report, jobsHash: currentHash, generatedAt: new Date() },
    { upsert: true, new: true },
     {
        returnDocument: "after",
      }
  );

  res.json({ success: true, report, fromCache: false });
};





module.exports.editstatus=async(req,res)=>{

   const { status, statusDate } = req.body;
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        status,
        statusDate,
      },
      {
        returnDocument: "after",
      }
    );
// console.log("updatedjjobs",updatedJob);

    res.status(200).json({
      success: true,
      data: updatedJob,
    });
}




//stats count
const statsCache = new Map(); // userId -> { data, expiresAt }
const STATS_TTL = 5 * 60 * 1000; // 5 minutes

module.exports.stats = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);

  // const userId = req.user.id;
  const cached = statsCache.get(userId);

 
  if (cached && Date.now() < cached.expiresAt) {
    return res.json({ ...cached.data, fromCache: true });
  }

  const [result] = await Job.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        applicationCount: { $sum: 1 },
        interviewCount:   { $sum: { $cond: [{ $eq: ["$status", "interview"]  }, 1, 0] } },
        rejectCount:      { $sum: { $cond: [{ $eq: ["$status", "rejected"]   }, 1, 0] } },
        assessCount:      { $sum: { $cond: [{ $eq: ["$status", "assessment"] }, 1, 0] } },
        interviewedCount: { $sum: { $cond: [{ $eq: ["$status", "interviewd"] }, 1, 0] } },
        jobCount:         { $sum: { $cond: [{ $eq: ["$status", "joboffer"]   }, 1, 0] } },
      }
    }
  ]);

  const stats = result ?? {
    applicationCount: 0, interviewCount: 0, rejectCount: 0,
    assessCount: 0, interviewedCount: 0, jobCount: 0
  };
  delete stats._id;

  statsCache.set(userId, { data: stats, expiresAt: Date.now() + STATS_TTL });
  res.json(stats);
};