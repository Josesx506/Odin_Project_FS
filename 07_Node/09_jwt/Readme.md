### JWT authorization
In this app, I created an express server to perform authentication with the local and jwt strategy. The jwt strategy works 
by issuing a jwt **only after** a user has been signed in. In the [tutorial video](https://www.youtube.com/watch?v=Ne0tLHm1juE&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=11&t=1780s), 
Zach verified the login by checking if the `username` existed in the db. This didn't sit well with me because 2 users can 
have the same username, so I used the `LocalStrategy` for verifying the login route only, then used the `jwt` to 
authenticate subsequent protected routes. <br>

Unlike the previous project, the JWT strategy requires sending the server response as a json, so redirecting the page 
to a view is not the best option. If you render a view, the token should be shared as one of the variables in the view,
which should then be saved to a client cache like `LocalStorage` or `indexDB`
```html
// client side
<script>
    function removeJWT() {
        // Triggered when the logout button is clicked
        localStorage.removeItem('jwt');
    }
    
    // Check if token exists in localStorage, if not, store it
    document.addEventListener('DOMContentLoaded', function () {
        const token = "<%= token %>";
        const storedToken = localStorage.getItem('jwt');
        
        if (token && token !== "undefined" && !storedToken) {
        localStorage.setItem('jwt', token);
        console.log('Token stored in localStorage');
        } 
    });
</script>
```
To get around this, I created a JS script that appends the token value to localStorage at the bottom of the page. 
All subsequent requests should then get JWT key from localStorage and append it to the `Authorization` HTTP header. 
This was pushing the limits of my ejs views ability, so I only tested the protected route with ***POSTMAN***. <br>

Within my `auth` route, the protected route uses the jwt middleware to regulate user access
```JS
router.get('/protected', 
  passport.authenticate('jwt', 
    {session: false}),
  (req,res,next) => {
    res.status(200).json({ success: true, msg: 'You are authorized to access this protected route' });
  }
);
```

> [!Important]
>  It's better to use jwt authentication with a dedicated frontend server like React vs. rendering it within views with 
    `ejs`. This ensures values can be easily extracted from localStorage and page redirecting can be handled on the 
    clientside. The token is not saved in `res.locals`, hence saving and retrieving it from localStorage is paramount. 