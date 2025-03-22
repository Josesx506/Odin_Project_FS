const express = require('express');
const sessionMdlwr = require('./config/session');
const multerMdlwr = require('./config/multer');
const cloudinary = require('./config/cloudinary');

const app = express();

// Middleware for views, json, and form body
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware for auth
app.use(sessionMdlwr);

app.get("/",(req,res)=>{
    res.render("index",{
        title: "Odin Drive"
    })
})

app.post("/upload",multerMdlwr.single("upldFile"),(req,res)=>{
    const fileSize = req.file ? Math.round(req.file.size/1000) : 0;
    const tag = req.file.mimetype.split("/")[1];
    console.log(req.file);

    cloudinary.uploader.upload(req.file.path, 
        // { folder: "odin_drive/uploads" }, // folder name will be a combination of username and root directory
        (err, result) => {
        if(err) {
          return res.status(500).json({
            success: false,
            message: "Error"
          })
        }
    
        res.status(200).json({
            title: "Odin Drive",
            tag: tag,
            fileName: req.file.originalname,
            size: `${fileSize} kb`,
            public_id: result.public_id, 
            url: result.secure_url
        })
    });
})


app.listen(3000, ()=>{
    console.log("Express app is listening on port 3000");
})