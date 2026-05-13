const {z}=require('zod');

const signinValidation=z.object({
    uname:z.string({required_error:"Name is required"}).trim()
          .min(3,{message:"Name must have atleat 3 charecters"})
          .max(250,{message:"Maximum charecters exceded"}),

    email:z.string({required_error:"Email is required"}).trim()
           .email({message:"invalid Email Address"})
           .max(255)
               .transform(val => val.toLowerCase()),

    password:z.string({required_error:"password is required"}).trim()
            .min(8,{message:"minimum 8 charecters required"})
            .max(25,{message:"maximum 25 charects only"})
         
})

const loginValidation=z.object({
    uname:z.string({required_error:"Name is required"}).trim()
          .min(3,{message:"Name must have atleat 3 charecters"})
          .max(250,{message:"Maximum charecters exceded"}),
      password:z.string({required_error:"password is required"}).trim()
            .min(8,{message:"minimum 8 charecters required"})
            .max(25,{message:"maximum 25 charects only"})
})

module.exports={signinValidation,loginValidation}