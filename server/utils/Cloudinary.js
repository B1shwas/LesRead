import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

const uploadOnCloudinary = async (file, folder) => {
  try {
    if (!file) return null;
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder,
      use_filename: true,
      unique_filename: false,
    });
    unlinkSync(file);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    return error;
  }
};

export { uploadOnCloudinary };
