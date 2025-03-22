const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req,file,cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10000000 }, // 10 MB
    // fileFilter: function(req, file, cb) {
    //   checkFileType(file, cb);
    // }
});

// Check file type
// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
  
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images only! (jpeg, jpg, png, gif)');
//     }
// };


module.exports = upload;