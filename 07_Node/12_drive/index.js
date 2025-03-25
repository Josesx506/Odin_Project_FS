const express = require('express');
const sessionMdlwr = require('./config/session');
const multerMdlwr = require('./config/multer');
const cloudinary = require('./config/cloudinary');
const flash = require("connect-flash");
const passport = require('./config/passport').passport;
const utils = require('./utils');

// Routes
const authRoute = require('./routes/auth');
const driveRoute = require('./routes/drive');

const app = express();

// Middleware for views, json, and form body
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware for auth
app.use(sessionMdlwr);
app.use(passport.session());
app.use(flash());               
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Middleware for routes
app.use('/auth',authRoute);
app.use('/drive',driveRoute);


// INCOMPLETE
app.get("/",(req,res)=>{
    res.render("index",{
        title: "Odin Drive"
    })
})


// app.post("/upload",multerMdlwr,(req,res) => {

//     if (!req.file) {
//         return res.status(400).json({ success: false, message: "Error: No file uploaded!" });
//     }

//     const fileSize = req.file ? utils.bytesToMB(req.file.size) : 0;
//     const tag = req.file.mimetype.split("/")[1];
//     const fileExt = req.file.originalname.split('.').pop().toLowerCase();
//     const resourceType = utils.resolveResourceType(fileExt);
//     const fileName = utils.escapeString(req.file.originalname);
    
//     cloudinary.uploader.upload_stream({ 
//         resource_type: resourceType,
//         overwrite: true,
//         invalidate: true,
//         public_id: fileName,
//         folder: "odin_drive"  }, 
//         // folder name will be a combination of username and root directory
//         (err, result) => {
//         if(err) {
//           return res.status(500).json({
//             success: false,
//             message: "Error"
//           })
//         }

//         // Private link flow
//         let link = cloudinary.utils.private_download_url(result.public_id,fileExt,
//             attachment=true,
//             format=fileExt,);
//         // console.log(link)
    
//         res.status(200).json({
//             title: "Odin Drive",
//             tag: tag,
//             fileName: req.file.originalname,
//             size: `${fileSize} mb`,
//             public_id: result.public_id, 
//             url: result.secure_url
//         })
//     }).end(req.file.buffer);
// })


app.listen(3000, ()=>{
    console.log("Express app is listening on port 3000");
})