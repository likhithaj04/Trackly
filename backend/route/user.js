const express=require('express');
const router=express.Router();
const userController=require('../controllers/user')
const {wrapAsync}=require('../error')
const validate=require('../middlewares/zodMiddleware')
const {signinValidation,loginValidation}=require('../validation/zodValidation')
const verifyToken=require('../middlewares/verifiy')


router.post('/adduser',validate(signinValidation),wrapAsync(userController.addUser))
router.post('/login',validate(loginValidation),wrapAsync(userController.login))
router.post('/logout',wrapAsync(userController.logout))
// router.get("/verify", verifyToken, async (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.user,
//   });
// });

module.exports=router;
