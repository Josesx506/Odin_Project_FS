### Intro
In this project, I want to improve my auth skills. Deliverables include designing a simple api with 
- [x] Role based access control (RBAC)
- [x] Auth with JWT
- [ ] Implementing JWT Refresh tokens

### Packages
- express 
- jsonwebtoken 
- bcryptjs 
- dotenv
- prisma 
- @prisma/client 


### Notes
Don't forget to delete the *output* line from your `schema.prisma` file after running `npx prisma init`
```bash
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```
Leaving it makes prisma generate some tsx files that were not allowing express to recognize my JS modules

### Workflow
Similar to how I implemented JWTs with `passport-jwt` but this time, I didn't use rsa keys or passport. 
- Set all user roles to db ENUM objects and select one as default.
- Allow signups with hashed passwords from `bcrypt` and save the details with `prisma`. 
- Send a json with a success status to frontend. Frontend server handles from validation and redirect to sign in page.
- Upon sign in, generate a jwt with an expiry token and a secret key from the env variable. The jwt contains the user's 
    id and role as a payload. 
- Roles and permissions are saved as a static key-value object in a file. The permissions a user has can be gotten with 
    `const permissions = ROLES[ROLE];`
- Protected routes have 2 middleware functions `authJWT` and `authRole`. 
- The first middleware validates if the bearer token is active and confirms the payload. It reads the user data from the 
    db and attaches it to the `req` object.
- The second middleware receives an array of permissions as an argument. If the user has the permission requirements based 
    on their role, they can access the route else they receive a forbidden error.
- `passport` isn't used to validate and sign users out.

### Learnings
You can create Roles and Permissions in a db, using one-to-many relationships from each role to specified permissions but,
it requires 
- a script to first seed the db using the roles and permissions defined in a file, 
- then a function to read the files from the db into a simple JS object only once when the app starts
- the function saves the RBAC permissions into a key-value object
- then a middleware to validate the user permissions for each role

If you don't want to use a cached RBAC object, you'll have to be reading the permissions db each time a request is made 
on a protected route, which can slow the app down. <br>
If you have a complex application with multiple servers, using a centralized db with roles and permissions makes sense, 
but since the values don't change much, it was easier for me to use a simple file.