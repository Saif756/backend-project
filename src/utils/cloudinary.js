import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
      
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
      });

      // Safe file deletion
      try {
        fs.unlinkSync(localFilePath);
      } catch (deleteError) {
        console.log("Could not delete temp file:", deleteError.message);
      }
      
      return response;

    } catch (error) {
        // Safe file deletion in error case
        try {
          fs.unlinkSync(localFilePath);
        } catch (deleteError) {
          console.log("Could not delete temp file after error:", deleteError.message);
        }
        
        console.error("Cloudinary upload failed: ", error);
        return null;
    }
}

export { uploadOnCloudinary };