### Set Up
You can install it locally to test or use a remote instance like [MongoDBAtlas](https://www.mongodb.com/products/platform/atlas-database). Local instances need to be deployed to work and atlas can 
provide simple free instances for development purposes. <br>
Instead of an ORM, NoSQL dbs use an object document mapping (**ODM**). For MongoDB, we can use `mongoose` to manage our 
db schema, models, and connections. Install it with `npm install mongoose`. In mongo / NoSQL, ***`collections`*** are the 
equivalents of **tables** from SQL relational databases, and ***`documents`*** are equivalent to **rows**. Each document 
is like a json key-value pair with a unique id that is like a uuid string. Check this tutorial for creating a 
[collection](https://www.youtube.com/watch?v=bxsemcrY4gQ&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=10&t=235s) 

### Mongoose
Mongoose connects to a db asynchronously, so the `app.listen` logic should only be triggered after the db connection is properly 
established.
```JS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const dbUri = process.env.DATABASE_URL;
// options for handling mongoose warnings from video tutorial
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }; 
// The connection syntax can work with/without options
// Start listening on the port only when the data is available
mongoose.connect(dbUri, options)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
```

### MongoDB Schemas
Create a `models` directory in your app directory. The schema defines the structure of the document. For each schema, create a new 
file with the potential table name e.g. `blog.js`
```JS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogOptions = { timestamps: true }
const blogSchema = new Schema({
    title: { type: String, required:true },
    snippet: { type: String, required:true },
    body: { type: String, required:true }
}, blogOptions)

// Typically model names are capitalized
const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog }
```
In MongoDB, databases are not created explicitly until you insert some data into them. 

### Using the tables in an app
Once a schema is created, we can connect to it in an app and perform data wrangling operations
```JS
const Blog = require('./model/blog');

app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'new blog entry',
        snippet: 'dummy snipper',
        body: 'Lorem 50 characters'
    })
    // Insert new entry asynchronously
    blog.save()
        .then((result)=>{res.send(result)}) // Send the response back to frontend
        .catch((err)>{console.log(err)});
})

app.get('/get-all-blogs', (req,res) => {
    // Retrieve all blog entries asynchronously
    Blog.find()
        .then((result)=>{res.send(result)}) // Send the response back to frontend
        .catch((err)>{console.log(err)});
})

app.get('/get-one-blog', (req,res) => {
    // Retrieve specific blog entries asynchronously
    Blog.findById('blogUniqueId1')
        .then((result)=>{res.send(result)}) // Send the response back to frontend
        .catch((err)>{console.log(err)});
})
```

| Operation | Mongo Syntax |
| :--- | :--- |
| insert | `model.save()` |
| select all | `model.find()` |
| select with Id | `model.findById(<string>)` |
| select with filter | `model.find({name:'blog1',snippet:'...'})` |
| select and sort | `model.find().sort({createdAt:-1})` |

Sorting with `-1` puts the newest dates first, i.e. descending order


### Using db for CRUD in POST, GET, DELETE requests
```JS
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./model/bog');

// middleware to parse data from post request
app.use(express.urlencoded({ extended: true }));

app.post('/blogs', (req,res) => {
    // access the body of the request because middleware is available
    const blog = new Blog(req.body)
    // Insert new entry asynchronously
    blog.save()
        .then((result)=>{res.redirect('/blogs');}) // Redirect back to blog page
        .catch((err)>{console.log(err)});
})

// dynamic routes 
app.get('/blogs:id', (req,res)=>{
    const id = req.params.id;
    // Retrieve specific blog entry asynchronously
    // Render the details view/send the data to the frontend
    Blog.findById(id)
        .then((result)=>{res.render('details',{ 
            body : result.body, 
            title : result.title })
        }) 
        .catch((err)>{console.log(err)});
})

app.delete('/blogs:id', (req,res)=>{
    // Data can be accessed with query selector in views JS or with react ref
    const id = req.params.id;
    // Delete specific blog entry asynchronously. Redirect doesn't work directly, so 
    // send json the client can use to redirect to a view
    Blog.findByIdAndDelete(id)
        .then((result)=>{res.json({ redirect:'/blogs' }) }) 
        .catch((err)>{console.log(err)});
    // client JS can use window.location.href=data.redirect inside fetch api to redirect
})
```