const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });

    // Crop to 450x350 using sharp
    const croppedBuffer = await sharp(req.file.buffer)
      .resize(450, 350, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'flipr', resource_type: 'auto' },
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
          }
          res.json({ url: result.secure_url });
          resolve();
        }
      );
      stream.end(croppedBuffer);
    });
  } catch (err) { 
    console.error(err); 
    res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;
