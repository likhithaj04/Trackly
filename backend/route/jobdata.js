const jobdataController=require('../controllers/jobdata')
const express=require('express')
const router=express.Router();
const {wrapAsync}=require('../error')
const multer=require('multer')
const { storage } = require("../cloudconfig");
const verifyToken=require('../middlewares/verifiy')

const upload = multer({ storage: multer.memoryStorage() });

router.post("/jobdata",verifyToken,upload.single("resume"),wrapAsync(jobdataController.addJobData))
router.get("/alljob",verifyToken,wrapAsync(jobdataController.jobs))
router.patch('/jobstatus/:id',wrapAsync(jobdataController.editstatus))
router.get('/report',verifyToken,wrapAsync(jobdataController.report))
router.get('/stats',verifyToken,wrapAsync(jobdataController.stats))

module.exports = router;