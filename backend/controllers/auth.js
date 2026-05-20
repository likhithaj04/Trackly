
const User=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.verifyEmail=async(req,res)=>{
   const {token}=req.query;

   const user=await User.findOne({
    verifytoken:token,
   verifyexpiry:{$gt:Date.now()}
   })

     if (!user) {
    return res.status(400).send("Invalid or expired token");
  }

  user.isverified=true,
  user.verifytoken=undefined,
  user.verifyexpiry=undefined,
await user.save();

const tokens=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

res.cookie('token',tokens,{
httpOnly: true,
      httpOnly: true,
    secure: true, // true in production
    sameSite: "strict",
})

   res.redirect('http://localhost:5173/app/addjob?verified=true');

}