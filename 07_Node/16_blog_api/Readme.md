### Summary
Welcome to the Odin Blog API project. Built out a backend express server that uses server sessions for authorization and 
stateless JWTs for authentication. Check out individual folder readmes for additional details. There are two frontend 
react websites. One for viewing the published blogs, and a content management system for moderating posts/comments. Users 
logged into either site can navigate to the other site but access can be restricted depending on where yu sign up. <br>

It was an interesting fullstack project and I look forward to building out other projects.

> [!Important]
> The same email cannot be used twice for registration. Users signed up as admins/authors can access the CMS and regular pages.
    Users that sign up on the user page can only access the basic blog page and restricted from the CMS.

### Todo
- [ ] Update CORS whitelisted links in `config/options.js` post deployment.
- [ ] Implement better loading states for components instead of divs
- [ ] Include [tinyMCE](https://www.tiny.cloud/docs/tinymce/6/cloud-quick-start/) text editior if there's time
https://www.youtube.com/watch?v=UTPsWbfHmFg
- [ ] Improve RBAC for frontend applications. The backend RBAC was robust with roles and sessions but I didn't want to include 
    the entire roles and permissions in the JWT so I had to use the author id with if statements and only the role to restrain 
    access. If the user gets past the frontend checks, the backend prevents access all the way to low level sql queries.