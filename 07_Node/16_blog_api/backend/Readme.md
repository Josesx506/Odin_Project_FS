### Blog Backend API server
Generates a series of blog posts and random users that the frontend can use if the db is empty. There's a reset prisma 
bash script that seed the db only when it is empty.

### Signing up with different roles
The signup route extracts the form entries and creates a new role if the case-sensitive role value in the form matches the 
defined role keys in my `config/roles.js` file. If the role value is omitted, a generic user is created by default.
```json
{
    "email": "janedoe54@odinblog.com",
    "password": "...",
    "username": "Jane Doe",
    "role": "..." // optional key which I manually include in the react fetch request.
}
```
The role value is not provided in the form as an input, and I include manually on the backend


### Packages
npm install express jsonwebtoken passport passport-local passport-jwt prisma @prisma/client bcryptjs dotenv cors cookie-parser

### Todo
- [x] Setup cors
- [ ] Update CORS whitelisted links in `config/options.js` post deployment


### Temp for error codes
- `400 Bad Request` - This means that client-side input fails validation.
- `401 Unauthorized` - This means the user isn't not authorized to access a resource. It usually returns when the user 
    isn't authenticated.
- `403 Forbidden` - This means the user is authenticated, but it's not allowed to access a resource.
- `404 Not Found` - This indicates that a resource is not found.
- `500 Internal server error` - This is a generic server error. It probably shouldn't be thrown explicitly.
- `502 Bad Gateway` - This indicates an invalid response from an upstream server.
- `503 Service Unavailable` - This indicates that something unexpected happened on server side (It can be anything like 
    server overload, some parts of the system failed, etc.).