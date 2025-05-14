
### OAuth implementation with Github, React, and Express
First create a web application account on Github at https://github.com/settings/developers. In the settings, set the 
_Homepage URL_ to your ***frontend*** sign in page, and the _Authorization callback URL_ to a ***backend*** express route e.g.
- Homepage URL - `http://localhost:3000/signin`
- Authorization callback URL - `http://localhost:1300/v1/auth/github/callback`

In react, use an onClick function to redirect you to your github url
```JS
async function onClick() {
    const route = await getGitHubOAuth();
    window.location.assign(route);
}
```
In my passport Github strategy, I modified it to create/update a user if the user is signing in for the first time to the 
application. It also creates an OTP that I write to my db. From the callback url, I redirect the user back to the frontend 
sign in page but with an `otp` search parameter. The SignIn component has a `useEffect` that runs on mount and checks if the 
otp is included in the url. When included, it sends a fetch request to the express server to exchange the otp for an 
`accessToken` value and `refreshToken` httpOnly cookie. The accessToken is saved in react state / local storage, and the 
user is redirected to any other page. <br>

This allows the flow to work like a regular email-password sign in flow. Both approaches can then receive signed jwts from 
my express server which is then used in react. 

> [!Note]
> The access and refresh tokens originally provided by Github cannot be validated by my express server so I don't use them 
at all, and I sign the JWTs myself.

Additional helpful links are
- Validating user with Github OAuth and passport on an express server[video](https://www.youtube.com/watch?v=wvAqie4soNc)
- Login flow for using Oauth with frontend and backend - [aritcle](https://medium.com/@tony.infisical/guide-to-using-oauth-2-0-to-access-github-api-818383862591) and [video](https://www.youtube.com/watch?v=O30O90edE7A)


> [!Note]
> NextJS also has a Next-Auth package for doing OAuth but it uses react server components and doesn't integrate well with express 
jwts