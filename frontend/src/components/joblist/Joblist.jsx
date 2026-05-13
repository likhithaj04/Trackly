import { useEffect, useState } from "react";
import api from "../../utils/api";
import { FaFileAlt } from "react-icons/fa";


export default function Joblist() {
  const [jobs, setJobs] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    api.get("job/alljob")
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const statusStyles = {
    applied: "bg-blue-100 text-blue-700",
    interview: "bg-yellow-100 text-yellow-700",
    interviewed:"bg-blue-300 text-black",
    assessment:"bg-indigo-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    selected: "bg-green-100 text-green-700",
  };
  const updateStatus = async (jobId, updatedFields) => {
    try {
       await api.patch(`job/jobstatus/${jobId}`, updatedFields);

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? { ...job, ...updatedFields }
          : job
      )
    );
    
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-6">
      <div className="max-w-9xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-500 p-5">
          <h1 className="text-2xl font-semibold text-white">All Jobs</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Summary</th>
                <th className="px-6 py-3">Applied At</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Status Date</th>
                <th className="px-6 py-3">Resume</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => {
                const statusKey = job.status?.toLowerCase();
                const style =
                  statusStyles[statusKey] ||
                  "bg-gray-100 text-gray-700";

                return (
                  <tr
                    key={job._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.company}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {job.role}
                    </td>

                    <td className="px-6 py-4 text-gray-600 line-clamp-2">
                      {job.summary}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(job.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          updateStatus(job._id, {
                            status: e.target.value,
                          })
                        }
                        className={`px-3 py-2 text-xs font-medium rounded-full outline-none cursor-pointer ${style}`}
                      >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="interviewd">Interviewed</option>
                        <option value="assessment">Assessment</option>
                        <option value="joboffer">joboffer</option>

                        <option value="rejected">Rejected</option>

                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        value={
                          job.statusDate
                            ? new Date(job.statusDate)
                              .toISOString()
                              .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          updateStatus(job._id, {
                            statusDate: e.target.value,
                          })
                        }
                        className="border rounded-lg px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedResume(
                          `https://docs.google.com/gview?url=${encodeURIComponent(job.resumeUrl + "?inline=true")}&embedded=true`
                        )}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaFileAlt size={18} /> 
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>


          {selectedResume && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedResume(null)}
              />

              <div className="relative bg-white w-[90vw] max-w-4xl h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 shrink-0">
                  <span className="text-sm text-gray-600 font-medium">Resume Preview</span>
                  <button
                    onClick={() => setSelectedResume(null)}
                    className="text-gray-500 hover:text-black text-xl leading-none"
                  >
                    ✖
                  </button>
                </div>

                {/* PDF Viewer — takes all remaining height */}
                <iframe
                  src={selectedResume}
                  className="w-full"
                  style={{ height: "calc(90vh - 44px)" }}   // 44px = header height
                  title="Resume PDF"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}