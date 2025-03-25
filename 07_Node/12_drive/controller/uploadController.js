const utils = require('../utils');
const prismaCntlr = require('./prismaController');
const cloudinary = require('../config/cloudinary');


async function getDriveView(req,res) {
  const itemId = req.params.itemId || null;
  if (itemId) {
    const content = await prismaCntlr.getFolderContents(parseInt(req.user.id), parseInt(itemId));
    const root = await prismaCntlr.findRootDir(parseInt(req.user.id));
    const directories = await prismaCntlr.getUserRootDescendants(parseInt(req.user.id));
    console.log(directories); //,content,root
  }
  res.render("drive", {
      title: "Media Drive",
      itemId: itemId,
      alert: req.flash('alert')
  });
}

async function postFolder(req,res) {
  const name = utils.escapeString(req.body.createFolder);
  const itemId = req.query.itemId || null;
  const userId = req.user.id;
  
  if (itemId) {
    // Create a new directory inside an existing parent
    await prismaCntlr.createFolder(name, parseInt(itemId), userId);
    req.flash('alert',"Folder created successfully");
    res.redirect(`/drive/${itemId}`);
  } else {
    // Create a new directory from the root directory
    const rootDir = await findRootDir(userId);
    await prismaCntlr.createFolder(name, parseInt(rootDir.id), userId);
    req.flash('alert',"Folder created successfully");
    res.redirect(`/drive/${rootDir.id}`);
  }
}

async function postFile(req,res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Error: No file uploaded!" });
  } else {
    const fileSize = req.file ? utils.bytesToMB(req.file.size) : 0;
    const tag = req.file.mimetype.split("/")[1];
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();
    const resourceType = utils.resolveResourceType(fileExt);
    const fileName = utils.escapeString(req.file.originalname);

    const userName = req.user.name;
    const rootDir = req.user.dirName;
    const currDir = req.directories;
    const uploadDir = `odin_drive/${userName}/${rootDir}/${currDir}`

    cloudinary.uploader.upload_stream({ 
        resource_type: resourceType,
        public_id: utils.escapeString(req.file.originalname),
        overwrite: true,
        invalidate: true,
        folder: uploadDir  }, // folder name is a combination of username and user directory
        
        (err, result) => {
        if(err) {
          return res.status(500).json({
            success: false,
            message: "Upload Error"
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
    }).end(req.file.buffer); 

  }
}

        // // Private link flow
        // let link = cloudinary.utils.private_download_url(result.public_id,fileExt,
        //     attachment=true,
        //     format=fileExt,);



module.exports = { getDriveView,postFolder,postFile }