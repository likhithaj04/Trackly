const {ZodError}=require('zod')

const validate=(schema)=>{
    return async (req,res,next) => {
          try{

        const decoded=await schema.parseAsync(req.body);

        req.validatedData=decoded;
      next();
    }
    catch(err){
        console.error(err);
        if(err instanceof ZodError){
            return res.status(400).json({
                message:"validation error",
                errors:err.issues.map(issue=>({
                    field:issue.path[0],
                    message:issue.message
                }))
            })
        }
           return res.status(500).json({
        message: "Internal server error"
      });
    }
    }
  
}

module.exports = validate;