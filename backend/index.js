const express=require('express')
const app=express()
require('dotenv').config()
const Job=require('./model/jobSchema')
const mongoose=require('mongoose')
const auth=require('./route/auth')
const cors=require('cors');
const userRouter=require('./route/user')
const cookieParser=require('cookie-parser')

const jobdataRouter=require('./route/jobdata')

app.use(express.json())
app.use(cookieParser())
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong");
});

app.use(cors({origin:'http://localhost:5173',
    credentials:true
}))

app.use("/",userRouter)
app.use("/auth",auth)
app.use("/job",jobdataRouter)

// const upload = multer({
//   storage: multer.memoryStorage(),
//  limits: { fileSize: 5 * 1024 * 1024 }
// });


app.listen((8000),(req,res)=>{
    console.log("Server started");
    mongoose.connect(process.env.Mongo_uri).then(()=>console.log("Mongodb connected"))
})