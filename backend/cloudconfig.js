const cloudinary=require('cloudinary').v2;
const {cloudinaryStorage, CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({

    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY

});

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'TRACKLY',
         resource_type: "raw",
        allowed_formats:["pdf"]
    }
}
)

module.exports={
    cloudinary,
    storage
}