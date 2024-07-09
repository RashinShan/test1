const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');  // Importing the fs module
const app = express();
const port = 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${getFileExtension(file.originalname)}`);
  }
});

// Function to get file extension
function getFileExtension(filename) {
  return filename.split('.').pop();
}

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File MIME type:', file.mimetype);
    console.log('File original name:', file.originalname);
    const filetypes = /mp3|mpeg/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the MP3 format!");
  }
});

const upload1 = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File MIME type:', file.mimetype);
    console.log('File original name:', file.originalname);
    const filetypes = /png|jpg|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: File upload only supports PNG and JPG formats!");
  }
});

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Endpoint to handle audio upload
app.post('/upload-audio', upload.single('audio'), (req, res) => {
  res.send({ message: 'Audio file uploaded successfully', file: req.file });
});

// Endpoint to handle image upload
app.post('/upload', upload1.single('file'), (req, res) => {
  res.send({ message: 'Image file uploaded successfully', file: req.file });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
