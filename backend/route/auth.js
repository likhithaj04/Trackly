
const express=require('express');
const router=express.Router()
const authController=require('../controllers/auth')

router.get("/verify-email",authController.verifyEmail)

module.exports=router;