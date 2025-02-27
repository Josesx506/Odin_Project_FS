## Creating a server
A server instance can be created in node using the `http.createServer` method
```JS
const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(8080);
```
You can lauch the server with `node app.js` or watch it with `node --watch app.js`. 
> [!Note]
> Creating a http`s` server on localhost threw an error for me
The `createServer` method creates an HTTP server that accepts handlers that will be executed every time we get a request.

## Handling Requests
Different request types can be handled in nodejs like other backends e.g. flask

### GET Request
```JS
const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/todos',
  method: 'GET',
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
```

### POST Request
```JS
const https = require('https');

const data = JSON.stringify({
  todo: 'Buy the milk',
});

const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'POST', // Accepts PUT and DELETE requests too
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
```

### PUT and DELETE
PUT and DELETE requests use the same POST request format - you just need to change the `options.method` value to the appropriate method.


## Handling files
File system in node is similar to `os` library in python. It allows you to open, create, delete, write, or watch  files / 
directories for changes
```JS
const fs = require('fs');
```
One peculiar thing about the `fs` module is that all the methods are asynchronous by default, but they can also work 
synchronously by appending Sync. It's easier to just work with the async mode to minimize callback hell
```JS
// Example: Read a file and change its content and read
// it again using promise-based API.
const fs = require('fs/promises');

async function example() {
  const fileName = '/Users/joe/test.txt';
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log(data);
    const content = 'Some content!';
    await fs.writeFile(fileName, content);
    console.log('Wrote some content!');
    const newData = await fs.readFile(fileName, 'utf8');
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}
example();
```
When using async mode, you can specify flags to read or append to existing files e.g `r+`, `w+`, `a`, `a+`. These flags are 
useful for oerwriting or appending rows to a file like linux/python expressions. <br>
Like writing files reading files can also be done synchronously, asynchronously, or with promises


## URLs
URL strings in nodejs are like flask app/blueprint routes. It's imported by default but you can import it manually with 
`require('node:url')`. A url takes an *endpoint name*, and a *base url*
```JS
const myURL = new URL('/foo', 'https://example.org/');
// URL(endpoint, base_url) returns https://example.org/foo 
```
You set or get properties like the `endpoint`, `host`, `port`, `host name`, `href`, `params` etc. 
```JS
const myURL = new URL('https://example.org:8080/foo#bar');
console.log(myURL.hash);  // get # argument
// Prints #bar

myURL.hash = 'baz';      // set params
console.log(myURL.href);
// Prints https://example.org:8080/foo#baz

console.log(myURL.host);
// Prints example.org:8080

console.log(myURL.hostname);
// Prints example.org
```
A list to all the URL methods is on the nodejs site [here](https://nodejs.org/api/url.html#url_the_whatwg_url_api).


## Event Emitters
Event emitters are nodejs's equivalent to client event listeners. The can be created with 
```JS
//  Initialize the emitters
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

// Define the emitter behaviour
eventEmitter.on('start', () => {
    console.log('started');
});

// Run the emitter
eventEmitter.emit('start');
```
The emitter definition can also take a function or callback with multiple arguments
```JS
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);
```
You can set the emitter to be triggered only once, remove a single emitter `removeListener() / off()` or remove all emitters 
`removeAllListeners()`