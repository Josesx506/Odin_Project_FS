const router = require('express').Router();
const validate = require('../config/validator');
const driveCntlr = require('../controller/uploadController');

// Middleware to add the baseUrl to response.locals
router.use((req,res,next)=>{
  res.locals.baseUrl = req.baseUrl;
  next();
})

router.get("/:itemId?", driveCntlr.getDriveView);
router.post("/create", driveCntlr.postFolder);
router.post("/upload", driveCntlr.postFile);

module.exports = router;