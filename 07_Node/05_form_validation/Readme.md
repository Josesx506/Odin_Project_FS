### Form validation
This project shows how to use `express validator` to escape form inputs for XSS attacks and validate inputs for POST and 
GET requests on node express servers. Unlike encoding and escaping, **sanitization** involves removing characters entirely 
in order to make the value “safe”. This might not be always possible, and  can lead to irreversible stripping of special
characters. Hence, escaping / encoding is recommended over sanitization. <br>

For this project, I implemented a simple User CRUD app with search capabilites using express and ejs view templates. The app 
is implemented using a MVC technique. An overview of the flow form validation lifecycle is 

<img src="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/forms/web_server_form_handling.png" style="width: 400px;" alt="Form validate lifecycle">

<br>

Validation types include
- checking text length
- checking numeric ranges
- removing special characters that can run JS on the server/db
- enforcing value formats (string,int) or form input types (email)

Launch the server with `npm run start` and view the results at `http://localhost:3000/`.