const express = require('express');
const apicache = require('apicache');

const app = express();

// Apply middleware
let cache = apicache.middleware;
app.use(express.urlencoded({extended: true}));
app.use(cache('5 minutes'));

// Data
const articles = [];
const users = [
    { email: 'abc@foo.com' }
]
const employees = [
    { firstName: 'Jane', lastName: 'Smith', age: 20 },
    { firstName: 'John', lastName: 'Smith', age: 30 },
    { firstName: 'Mary', lastName: 'Green', age: 50 },
]

app.post('/', (req, res) => {
    res.json(req.body);
});


// Example Employees
app.get('/employees', (req, res) => {
    const { firstName, lastName, age } = req.query;
    let results = [...employees];
    if (firstName) {
      results = results.filter(r => r.firstName === firstName);
    }
  
    if (lastName) {
      results = results.filter(r => r.lastName === lastName);
    }
  
    if (age) {
      results = results.filter(r => +r.age === +age);
    }
    res.json(results);
});


// Blog USERS
app.post('/users', (req, res) => {
    const { email } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }
    res.json(req.body);
});


// Blog ARTICLES
app.get('/articles', (req, res) => {
    // code to retrieve an article...
    res.json(articles);
});

app.post('/articles', (req, res) => {
    // code to add a new article...
    res.json(req.body);
});

app.put('/articles/:id', (req, res) => {
    const { id } = req.params;
    // code to update an article...
    res.json(req.body);
});

app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    // code to delete an article...
    res.json({ deleted: id });
});



// Blog COMMENTS
app.get('/articles/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const comments = [];
    // code to get comments by articleId
    res.json(comments);
});
  
app.listen(3000, () => console.log('api server v1 started on port 3000'));