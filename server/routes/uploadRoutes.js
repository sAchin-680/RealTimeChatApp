const express = require('express');
const multer = require('multer');
const router = express.Router();

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

// Upload route for handling file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ fileUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

module.exports = router;
