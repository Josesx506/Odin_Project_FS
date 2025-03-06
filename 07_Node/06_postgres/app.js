const express = require('express');
const userCntlr = require('./controller/userController');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/",userCntlr.getUsernames);
app.get("/create",userCntlr.createUsernameGet);
app.post("/create",userCntlr.createUsernamePost);
app.get("/delete",userCntlr.deleteUsernames);


app.listen(3000, ()=>{console.log('Running express server with postgres on port 3000')});