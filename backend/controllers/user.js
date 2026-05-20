const User=require('../model/user')
const bcrypt=require('bcryptjs');
const sendverification=require('../utils/mailer')
const crypto=require('crypto');
const jwt =require("jsonwebtoken")

exports.addUser=async(req,res)=>{
    
    const {uname,email,password}=req.body;
    if(!uname||!email||!password) return res.status(400).json({message:"empty fields"})
        const hashedpassword= await bcrypt.hash(password,10)  

    const verifytoken=crypto.randomBytes(32).toString('hex');
    const verifyexpiry=Date.now()+24*60*60*1000;
    // console.log(verifytoken,"emaildate",verifyexpiry);
        const user=new User({uname,email,password:hashedpassword,isverified:false,verifytoken,verifyexpiry});
       await user.save();
    
       const verifyurl=`http://localhost:8000/auth/verify-email?token=${verifytoken}`
    //    console.log("verify url",verifyurl)
      await sendverification(email,verifyurl)    
res.status(201).json({message: "Check your email to verify your account"})

}

exports.login=async(req,res)=>{

    const {uname,password}=req.validatedData;
    if(!uname||!password){
        return res.json({ success: false, messsage: "inavalid data" })
    }
          const user = await User.findOne({ uname });
         if (!user) {
        return res.json({ success: false, messsage: "inavalid data" })
      }

      const isMatch=bcrypt.compare(password,user.password)
       if (!isMatch) {
        return res.json({ success: false, messsage: "inavalid password" });
      }

      const tokens=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
      
      res.cookie('token',tokens,{
      httpOnly: true,
          secure: true, // true in production
          sameSite: "none",
      })
 res.send("success")
}

exports.showUser=async(req,res)=>{
   const data=req.body;
   console.log(data)
}

exports.logout = (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // true in production
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });

};