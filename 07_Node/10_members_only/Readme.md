npm install bcryptjs connect-pg-simple dotenv ejs express express-session passport passport-local pg

- [] Create Posts that are linked to user tables


### Rendering errors as alerts
`connect-flash` library is used to transmit messages across routes. Each message requires a key and a value 
`req.flash(<key>,<value>)`, then the key can be referenced to extract the message in another route. It's 
useful for rendering alerts/error messages when `res.locals` cannot be accessed during redirects.
```JS
function getAdmin(req, res, next) {
    res.render('auth/admin', {
        title: "update membership",
        alert: req.flash('alert'),
    })
}
async function postAdmin (req, res, next) {
    await dbController.updateUserStatus(req.user.id,req.body.status);
    req.flash('alert',`User Role: ${req.body.status}`);
    res.redirect('/auth/admin');
}
```