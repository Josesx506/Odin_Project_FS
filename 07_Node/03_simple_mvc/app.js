const path = require('node:path');
const express = require('express');
let ejs = require('ejs')
const LRU = require('lru-cache');
const blogRouter = require('./routes/blog')

app = express();
ejs.cache = new LRU(100); // LRU cache with 100-item limit

// Static files like css
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// Dynamic ejs view templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/blog',blogRouter);

app.listen(3000, ()=>{
    console.log('Express server with MVC is active ...')
})