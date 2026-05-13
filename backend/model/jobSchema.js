const mongoose=require('mongoose');
const User=require('./user')

const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    role:{
      type:String,
      required:true
    },
    summary:{
        type:String,
        required:true
    },
    outreachmsg:{
        type:String,    },
  appliedAt: {
    type: Date,
    default: Date.now // auto set when saved
  },
  status: {
    type: String,
    enum: ["saved", "applied", "interview","interviewd", "rejected","assessment","joboffer"],
    default: "applied"
  },
   resumeUrl: {
    type: String
  },
  statusDate: {
  type: Date,
  default: null
},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User
  }
})

jobSchema.index({company:1})

const  job=mongoose.model("job",jobSchema);

module.exports=job