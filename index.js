var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer to handle file uploads
const upload = multer({
  dest: 'uploads/', // Destination folder for file uploads
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST route to handle file upload and respond with file details
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  // Check if a file was uploaded
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with file details
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
