const nodemailer=require('nodemailer')
require('dotenv').config()

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASSKEY
    }
});


const sendVerification=async(to,verifyurl)=>{
 await transporter.sendMail({
    from:`process.env.EMAIL_USER`,
    to,
    subject:"verification of your account",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyurl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `
 })
}

module.exports=sendVerification