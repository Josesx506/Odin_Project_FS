const data = require('../model/data');

function getBlogs(req, res) {
    res.render('index', { 
        links: data.links,
        user: data.user,
        message: 'EJS Users are:', 
        users: data.users  
    });
}

function getBlogAbout(req, res) {
    res.render('about', { links: data.links });
}

function getBlogArticles(req, res) {
    res.render('articles', {  
        links: data.links, 
        articles: data.posts 
    });
}

module.exports = { getBlogs, getBlogAbout, getBlogArticles }