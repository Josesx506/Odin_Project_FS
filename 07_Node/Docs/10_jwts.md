### JSON web tokens (JWT)
A JWT is an encrypted key that is seperated into different components by a period ("."). Major components are the 
- header
- payload
- keys (public and private)

> [!Important]
> JWTs are by default stateless, and don't exist within server sessions. Therefore 
    `passport.authenticate('jwt', {session: false})` has to be called on every protected endpoint, and 
    `req.isAuthenticated()` wouldn't work.

### JWT Authorization Process
1. User logs into web app, and is issued a JWT (after login)
2. User client/browser stores the JWT in local storage or cookie
3. On every HTTP request that require auth, the browser attaches the JWT in the `Authorization` HTTP header
4. The server looks for the JWT in the `Authorization` header and verifies the signature
5. Valid signatures are decoded to extract the user id and check user info the db (typical session auth workflow)
6. The user receives data from the protected route

### JWT strategy
JWT can be implemented in passportjs using the `passport-jwt` strategy. The user id from the db can be db can be encoded as 
part of the payload. Other properties like user roles can also be encoded into the jwt to enable easier access to role-based 
access control (RBAC) protection across endpoints. It requires 
- a public and private key for signing the jwts
- a payload (can include non sensitive user details like id or roles)
- db access for verifying signed user data

Once a JWT has been verified, the token can be shared in the json response. The shared token can then be used for future 
access to protected routes. If the token expires, a login request should be triggered again to refresh the token. Protected 
routes will use passport-jwt similar to how passport-local strategy is used. Upon logout, the jwt can be deleted from 
localStorage in the browser. <br>
Because localStorage is vulnerable to XSS attacks, storing JWTs in cookies is recommended. See blog for addditional 
[details](https://www.descope.com/blog/post/developer-guide-jwt-storage).