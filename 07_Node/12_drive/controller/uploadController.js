const utils = require('./utils');
const PrismaClient = require('@prisma/client');
const cloudinary = require('./config/cloudinary');

const prisma = new PrismaClient();

async function postFile(req,res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Error: No file uploaded!" });
  } else {
    const fileSize = req.file ? utils.bytesToMB(req.file.size) : 0;
    const tag = req.file.mimetype.split("/")[1];
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();
    const resourceType = utils.resolveResourceType(fileExt);

    const userName = req.user.name;
    const rootDir = req.user.dirName;
    const currDir = req.directories;
    const uploadDir = `odin_drive/${userName}/${rootDir}/${currDir}`

    cloudinary.uploader.upload_stream({ 
        resource_type: resourceType,
        public_id: utils.escapeString(req.file.originalname),
        overwrite: true,
        folder: uploadDir  }, // folder name is a combination of username and user directory
        
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
    }).end(req.file.buffer); 

  }
}



module.exports = { postFile }