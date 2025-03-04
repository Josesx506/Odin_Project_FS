const path = require('node:path');
const express = require('express');
const ejs = require('ejs')
const LRU = require('lru-cache');
const miniMsgRouter = require('./routes/miniMessage')


const app = express();
ejs.cache = new LRU(100);

// Static files like css
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// Dynamic ejs view templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const port = process.env.PORT || 3000;

app.use('/mini',miniMsgRouter);

// This is because I want to use a router with a baseUrl
// instead of running the app in main (python lol)
app.get('/',(req,res)=>{
    res.redirect('/mini')
})

app.listen(port, ()=>console.log(`Starting Express mini-message server on port ${port}...`))