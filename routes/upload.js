const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const filename = `${Date.now()}-crop.jpg`;
    const outDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const outPath = path.join(outDir, filename);

    // Crop / resize to 450x350
    await sharp(req.file.buffer)
      .resize(450, 350, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(outPath);

    res.json({ url: `/uploads/${filename}` });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
