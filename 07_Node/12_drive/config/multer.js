const path = require('node:path');
const multer = require('multer');

// Set up Multer for handling file uploads in memory buffers without disk storage
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10000000 }, // 10 MB
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4|avi|mov|mkv/; // Image & video formats
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb({ message: 'Error: Only images (jpeg, jpg, png, gif) and videos (mp4, avi, mov, mkv) are allowed!' });
    }
}

function uploadSingleFile (req, res, next) {
    // upldFile is the form input name attribute value
    upload.single("upldFile")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
};


module.exports = uploadSingleFile;