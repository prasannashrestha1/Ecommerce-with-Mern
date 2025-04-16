import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploded",
      });
    }

    // function to hndle the stream uplod to cloudinary\
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // use streamifier to convert fiel buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // call the streamupload function
    const result = await streamUpload(req.file.buffer);
    // respond with the uploaded image url
    res.json({ imageUrl: result.secure_url });
  } catch (error) {}
});

export default router;
