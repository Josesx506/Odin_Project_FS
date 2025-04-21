### Testing
Testing in nodejs can be performed with the library [SuperTest](https://github.com/ladjs/supertest). Install it with 
`npm install supertest --save-dev`. SuperTest can be used inside of a Jest style `describe/test` block, but the syntax 
and use of these are common among most testing libraries, so the concepts should be easily replicated in Mocha with 
Chai or Jasmine or Tape or whatever testing library you prefer. <br>

When running tests we create a new test app, to avoid calling the `app.listen` command and starting our server, but it’s 
also useful because, in larger apps, we can skip some of the optional configuration steps and only include the bits that 
we need for our testing purposes.

>[!Important]
> In a larger test suite, it would probably be useful to abstract this part out to its own file that gets imported into 
each test file. There is also no need to keep track of ports.

The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop 
down to the lower-level API provided by superagent.


### Testing Config
Running jest with ES6 module syntax requires a special `package.json` setup. Install express, jest, and supertest with 
npm as dev dependencies, then add the following to your package config.
```JSON
  "scripts": {
    "test": "NODE_OPTIONS='--experimental-vm-modules' jest *.js",
    "watch": "NODE_OPTIONS='--experimental-vm-modules' jest --watch *.js"
  },
  "type": "module",
```


### Testing requests
The parameter `done` is passed into the test callback to signal that the test is complete. SuperTest allows us to pass it 
into the last `.expect` and calls it for us.
```JS
test("index route works", function(done) {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect({ name: "frodo" })
    .expect(200, done);
});
```

We can test any type of request, including `get`, `post`, `patch`, and `delete` requests. Asides abstracting the main app, we 
can also mock databases and other resources for different tests.

>[!Note]
> [Superagent](https://ladjs.github.io/superagent/) sends any HTTP error (anything other than a 2XX response code) to the 
callback as the first argument if you do not add a status code expect (i.e. `.expect(302)`).

If you are using the `.end()` method `.expect()` assertions that fail will not throw - they will return the assertion as an 
error to the `.end()` callback. In order to fail the test case, you will need to rethrow or pass err to `done()`, as follows:
```JS
describe('POST /users', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/users')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
```
You can also use promises or async/await syntax. <br>

SuperTest actually pulls from another related project called ***SuperAgent***. Any method that you can call in SuperAgent you can 
also call from SuperTest.


### Testing file uploads and multipart requests
Anything you can do with superagent, you can do with supertest - for example multipart file uploads!
```JS
request(app)
  .post('/')
  .field('name', 'my awesome avatar')
  .field('complex_object', '{"attribute": "value"}', {contentType: 'application/json'})
  .attach('avatar', 'test/fixtures/avatar.jpg')
  ...
```

SuperAgent is also great for building multipart requests for which it provides methods `.attach()` and `.field()`. When you use 
`.field()` or `.attach()` ***you can't use `.send()`*** and you must not set `Content-Type` (the correct type will be set for you).
To send a file use `.attach(name, [file], [options])`. You can attach multiple files by calling `.attach` multiple times. The 
arguments are:
- *name* — field name in the form.
- *file* — either string with file path or Blob/Buffer object.
- *options* — (optional) either string with custom file name or {filename: string} object. In Node also {contentType: 'mime/type'} 
    is supported. In browser create a Blob with an appropriate type instead.

```JS
request(app)
  .post('/upload')
  .attach('image1', 'path/to/felix.jpeg')
  .attach('image2', imageBuffer, 'luna.jpeg')
  .field('caption', 'My cats')
  .then(callback);
```

Much like form fields in HTML, you can set field values with `.field(name, value)` and `.field({name: value})`. Suppose you want 
to upload a few images with your name and email, your request might look something like this:
```JS
request(app)
  .post('/upload')
  .field('user[name]', 'Tobi')
  .field('user[email]', 'tobi@learnboost.com')
  .field('friends[]', ['loki', 'jane'])
  .attach('image', 'path/to/tobi.png')
  .then(callback);
```

### Testing with CORS workaraounds
For security reasons, browsers will block cross-origin requests unless the server opts-in using CORS headers. Browsers will also 
make extra OPTIONS requests to check what HTTP headers and methods are allowed by the server. <br>
The `.withCredentials()` method enables the ability to send cookies from the origin, however only when `Access-Control-Allow-Origin` 
is not a wildcard ("*"), and `Access-Control-Allow-Credentials` is "true".
```JS
request(app)
  .get('https://api.example.com:4001/')
  .withCredentials()
  .then(res => {
    assert.equal(200, res.status);
    assert.equal('tobi', res.text);
  })
```

### Unit and Integration tests
- ***Unit tests*** can be used to test complex db queries to verify that they return ideal values. To work with a db, we'll need to 
  seed the db values first and this is done as part of an integration test.
- ***Integration tests*** involve testing the entire workflow including the db, routes, controllers, and even the server as desired.
  We typically have to separate the production and test environments using environment vsriables.
  ```bash
  NODE_ENV=development
  DATABASE_URL=postgresql://<user>:<password>@localhost:3306/inventory_application
  TEST_DATABASE_URL=postgresql://<user>:<password>@localhost:3306/test_inventory_application
  ```
  Then we update our `package.json` files 
  ```json
  {
    // other stuff
    "scripts": {
      "dev": "NODE_ENV=development && node app.js",
      "test": "NODE_ENV=test && node prisma/seed.js && NODE_OPTIONS='--experimental-vm-modules' jest *.js",
    },
    // even more stuff
  }
  ```
  Based on the `NODE_ENV`, you can programmatically switch out database urls:
  ```JS
  const databaseUrl = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
  ```


>[!Note]
> Typically the seed file should check if the db is already populated before inserting new values. Also use the same db engine for 
  test and prod e.g.postgres. Don't try to mix db engines across both environments to minimize sql translation errors. Setup 
  test env postgres with docker if you don't want to install locally.