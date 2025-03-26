const utils = require('../utils');
const prismaCntlr = require('./prismaController');
const cloudinary = require('../config/cloudinary');
require('dotenv').config();


async function getDriveView(req,res) {
  const userId = parseInt(req.user.id);
  let itemId = req.params.itemId ? req.params.itemId : await prismaCntlr.findRootDirId(userId);
  itemId = parseInt(itemId);

  const userStorage = await prismaCntlr.getStorageUsed(userId);
  const maxStorage = process.env.BASIC_STORAGE;
  
  const content = itemId ? await prismaCntlr.getFolderContents(userId, itemId) : [];
  const filePath = itemId ? await prismaCntlr.getFilePathPg(itemId) : ["root"];
  const folders = await prismaCntlr.getAllFolders(userId);

  res.render("drive", {
      title: "Media Drive",
      itemId: itemId,
      alert: req.flash('alert'),
      folders: folders,
      filePath: filePath,
      folderContent: content,
      dateFmtr: utils.formatDateTime,
      userStorage: userStorage,
      maxStorage: maxStorage
  });
}

async function postFolder(req,res) {
  const name = utils.escapeString(req.body.createFolder);
  const itemId = req.query.itemId || null;
  const userId = parseInt(req.user.id);

  let parentId = itemId ? itemId : await prismaCntlr.findRootDirId(userId);
  parentId = parseInt(parentId);

  // Check that the file name does not already exist in the db
  const content = itemId ? await prismaCntlr.getFolderContents(userId, parentId) : [];
  const match = content.filter(item=>item.name.toLowerCase()===name.toLowerCase());

  if (match.length>0) {
    req.flash('alert',"Name Error: Folder exists");
    res.redirect(`/drive/${parentId}`);
  } else {
    // Create a new directory inside an existing parent
    await prismaCntlr.createFolder(name, parentId, userId);
    req.flash('alert',"Folder created successfully");
    res.redirect(`/drive/${parentId}`);
  }
}

async function postFile(req,res, next) {
  // Earlier errors are handled with Multer Middleware
  const userId = parseInt(req.user.id);
  const userStorage = await prismaCntlr.getStorageUsed(userId);

  const itemId = req.query.itemId || null;
  let parentId = itemId ? itemId : await prismaCntlr.findRootDirId(userId);
  parentId = parseInt(parentId);
  const maxStorage = process.env.BASIC_STORAGE;

  const fileSize = req.file ? utils.bytesToMB(req.file.size) : 0;
  const tag = req.file.mimetype.split("/")[1];
  const fileExt = req.file.originalname.split('.').pop().toLowerCase();
  const resourceType = utils.resolveResourceType(fileExt);
  const fileName = utils.escapeString(req.file.originalname);

  // Resolve the upload directory
  // folder name is a combination of username and user directory
  const userName = req.user.name;
  let dirPath = await prismaCntlr.getFilePathPg(parentId);
  dirPath = dirPath.map(row => row.name);
  dirPath = dirPath.join("/");
  const uploadDir = `odin_drive/${userName}/${dirPath}`

  // Limit uploads by user storage
  if (userStorage+fileSize > maxStorage) {
    req.flash('alert',"Out of space. Delete items!");
    res.redirect(`/drive/${parentId}`);
  } 
  // Check for duplicates
  const content = itemId ? await prismaCntlr.getFolderContents(userId, parentId) : [];
  const match = content.filter(item=>item.name.toLowerCase()===fileName.toLowerCase());
  if (match.length>0) {
    req.flash('alert',"Name Error: File already exists");
    res.redirect(`/drive/${parentId}`);
  } else {
    cloudinary.uploader.upload_stream({ 
      resource_type: resourceType,
      public_id: fileName,
      overwrite: true,
      invalidate: true,
      folder: uploadDir  }, 
      
      async (err, result) => {
        if(err) {
          return next(err);
        }
        
        // Upload to postgres
        await prismaCntlr.uploadFile(
          userId,parentId,fileName,result.secure_url,
          fileExt, fileSize
        )
        req.flash('alert',"File uploaded successfully");
        res.redirect(`/drive/${parentId}`);
  }).end(req.file.buffer); 
  }

  

    
}

        // // Private link flow
        // let link = cloudinary.utils.private_download_url(result.public_id,fileExt,
        //     attachment=true,
        //     format=fileExt,);



module.exports = { getDriveView,postFolder,postFile }