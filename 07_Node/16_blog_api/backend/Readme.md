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