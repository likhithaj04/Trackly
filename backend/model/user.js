const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    uname:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        match:[/^\S+@\S+\.\S+$/, 'Invalid email']

    },
    password:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    verifytoken:String,
    verifyexpiry:Date
},
{
    strict:true
})

module.exports=mongoose.model('User',userSchema)