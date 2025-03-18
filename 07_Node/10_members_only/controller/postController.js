const dbController = require('./dbController');
const { validationResult } = require('express-validator');

function formatDateTime(date) {
    return date.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        hour12: false
    }).replace(",", " ·");
}

async function getPosts(req, res) {
    const posts = await dbController.getDBPosts();
    res.render('posts', {
        title: 'member posts',
        posts: posts,
        dtFmtr: formatDateTime,
        alert: req.flash('alert')
    })
}

async function postNewBlog(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const posts = await dbController.getDBPosts();
      return res.status(400).render("posts", {
        title: "member posts",
        posts: posts,
        dtFmtr: formatDateTime,
        errors: errors.array(),
      });
    
    } else {
        const user_id = req.user.id;
        const title = req.body.title;
        const body = req.body.content;
        await dbController.createPost(user_id,title,body);
        req.flash('alert',"Post created successfully");
        res.redirect('/posts');
    }
}

async function getDeleteBlog(req, res) {
    const postId = req.query.pid;
    await dbController.deletePost(postId);
    req.flash('alert',"Post deleted successfully");
    res.redirect('/posts');
}

module.exports = { getPosts, postNewBlog, getDeleteBlog }