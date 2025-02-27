### Content
- [Creating a server](#creating-a-server)
- [Handling Requests](#handling-requests)
- [File system](#handling-files)
- [Handling URLS](#urls)
- [Event Emitters](#event-emitters)


## Creating a server
A server instance can be created in node using the `http.createServer` method. The server takes in a function with request and response 
arguments, and requires a port where it can listen for requests come in at the end
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
File system in node is similar to `os` library in python but node also has a dedicated `os` module too. `fs` allows you to open, create, delete, 
write, or watch files/directories for changes. `os` allows you to check home directory, system properties like num. cpu's, total uptime, system 
platform etc. node also has a `path` module. `path` allows you to join directories, find path basename, extension etc. Overall, `fs`,`os`, and 
`path` can be likened to os and pathlib libraries in python. To get started with any of them
```JS
const fs = require('fs');
const os = require('os');
const path = require('path');
```
One peculiar thing about the `fs` module is that all the methods are asynchronous by default, but they can also work synchronously by appending 
`Sync` when calling the method name. It's easier to just work with the async mode to minimize callback hell. <br>
`fs` can be used read, append, and delete files/directories. When run in ***`async`*** mode, it requires 
```JS
fs.writeFile(filePath, fileData, callBack) {
  // Execute call back with if-else statement for error handling
  ...
}
```
In ***`sync`*** mode, no callback is required but the statement has to be wrapped in a `try-catch` statement
```JS
try {
  fs.writeFileSync(filePath, fileData);
} catch (err) {
  console.error(err);
}
```
Lastly they can be run within functions as ***`asynchronous promises`***. This requires a slightly different import, but also extends 
the fs module to resolve promises with async/await wrapped inside try-catch statements.
```JS
const fsp = require('node:fs/promises');

async function asyncWrite() {
  try {
    await fsp.writeFile(filePath, fileData,  options, callback);
  } catch (err) {
    console.log(err);
  }
}

asyncWrite(); // Call the function
```
When creating or editing files, you can specify flags as object **`options`** to read or append to existing files e.g [`r+`, `w+`, `a`, `a+`]. 
These flags are useful for overwriting or appending rows to a file like linux/python expressions. <br>
Like writing files reading files can also be done synchronously, asynchronously, or with promises


## URLs
URL strings in nodejs are like flask app/blueprint routes. It's imported by default but you can import it manually with 
`require('node:url')`. A url takes an *endpoint name*, and a *base url*
```JS
const myURL = new URL('/foo', 'https://example.org/');
// URL(endpoint, base_url) returns https://example.org/foo 
```
You set or get properties about the endpoint like the `host`, `port`, `hostname`, `href`, `params` etc. 
```JS
const myURL = new URL('https://example.org:8080/foo?q=todo1&year=2025#baz');
console.log(myURL);
// Prints 
URL {
  href: 'https://example.org:8080/foo?q=todo1&year=2025#baz',
  origin: 'https://example.org:8080',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org:8080',
  hostname: 'example.org',
  port: '8080',
  pathname: '/foo',
  search: '?q=todo1&year=2025',
  searchParams: URLSearchParams { 'q' => 'todo1', 'year' => '2025' },
  hash: '#baz'
}
```
You can also get the search parameters as a string `myUrl.search` or as a serialized object `myUrl.searchParams`. A list to all 
the URL methods is on the nodejs site [here](https://nodejs.org/api/url.html#url_the_whatwg_url_api).


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
`removeAllListeners()`. They're useful for logging events and using any other types of event listeners. Can be combined with 
`fs.writeFile` to create logging file on a server.