### Backend Intro tips
The back-end is all of the technology required to process the incoming request and generate and send the response to the client.
- The **server**. This is the computer that receives requests.
- The **app**. This is the application running on the server that listens for requests, retrieves information from the database, and sends a response.
- The **database**. Databases are used to organize and persist data

*Middleware* is any code that executes between the server receiving a request and sending a response. These middleware functions might modify the request object, 
query the database, or otherwise process the incoming request. Middleware functions typically end by passing control to the next middleware function, rather 
than by sending a response. <br>

Web frameworks provide tools and libraries to simplify common web development operations. You don't have to use a server-side web framework, but it is strongly 
advised — it will make your life a lot easier.

### What is Node?
> As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.

### Deployment
Following [review](https://www.youtube.com/watch?v=prjMJtXCR-g) of different hosting providers, [Railway](https://railway.com/) seemed like the best option for 
hosting backend servers, dbs, and containers in a portfolio scenario. AWS can be used for production grade applications.
<br>

Like webpack, you can watch a node script with `node --watch app.js`