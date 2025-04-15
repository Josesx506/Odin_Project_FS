### Blog Backend API server
Generates a series of blog posts and random users that the frontend can use if the db is empty. There's a reset prisma 
bash script that seeds the db only when it is empty. <br>
On the landing page, there's a ***freemium*** view of available posts. The post thumbnails are sanitized by the express 
server to include only the first 2 sentences and empty comment objects, so that the frontend can properly render it. The 
post thumbnails have links that redirect to protected routes. If the user is not signed in and they click on any of the 
links, the react frontend redirects the user to the sign in page. <br>
- `Basic` users can view published posts, add comments, and modify comments that they own. 
- `Author` users can view or modify posts that they created in the admin panel view. They can also add new comments or 
    modify comments and posts that they created.
- `Admin` users can view or delete any post or comment. However, they can only edit posts/comments that they created. This 
    seemed logical to me because it's better to delete posts/comments than to alter or misrepresent users views maliciously.

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
The role value is not provided in the form as an input, and I included it manually on the backend. If the role is not included 
the sign up defaults to the basic USER role. If the role does not match my required backend roles, the express server throws 
an error so that malicious users don't inject random roles into the db. 


### Packages
 - [x] @prisma/client
 - [x] @quixo3/prisma-session-store
 - [x] bcryptjs
 - [x] cookie-parser
 - [x] cors
 - [x] crypto
 - [x] dotenv
 - [x] express
 - [x] express-session
 - [x] jsonwebtoken
 - [x] passport
 - [x] passport-jwt
 - [x] passport-local
 - [x] prisma

### Learnings 
1.  Cookie options must always use `Strict` or `lax`. Using `None` would prevent react from detecting the http only jwt cookie.
    ```JS
    const cookieOptions = { 
        sameSite: 'Strict',
        ...
    }
    ```
2. Ensure consistency of error codes or it can quickly become a nightmare especially for refresh tokens. 
    - `401 Unauthorized` should be used when a user is not logged in or doesn't have a valid token.
    - `403 Forbidden` - This means the user is authenticated, but it's not allowed to access a resource e.g. delete,view,update etc.
    - `404 Not Found` - This indicates that a resource is not found e.g. when a comment id is incorrectly associated with a post.
    - `500 Internal server error` - should be reserved for when the server itself is having issues like it can't find the db etc.

3. For react frontend, because the jwt is saved on memory for security purposes, the react server sends regular requests to the 
    express server to persist authentication. Once it receives a 401 error once, it'll retry the `/v1/auth/refresh` route using 
    the jwt cookie to generate a new access token the second time. If it fails twice, it redirects the user to login.

4. For the `basic` blog, I didn't include any keys/roles in my json responses. Checking the authorId against the owner id is 
    sufficient to restrict user permissions. I still haven't figured out how to implement it for the admin panel

### Todo
- [ ] Update CORS whitelisted links in `config/options.js` post deployment.
- [ ] Create an authors view that shows the posts that they've written (low priority).
