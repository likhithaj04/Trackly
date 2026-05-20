
const express=require('express');
const router=express.Router()
const authController=require('../controllers/auth')
const verifyToken =require('../middlewares/verifiy')

router.get("/verify-email",authController.verifyEmail)

router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports=router;