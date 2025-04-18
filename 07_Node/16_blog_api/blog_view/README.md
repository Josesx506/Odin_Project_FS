This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
To change the default port for the react app, modify the package.json file and include a `-p` port argument
```json
  "scripts": {
    "dev": "next dev --turbopack -p 1800",
    "start": "next start -p 1800",
  },
```
Then start the dev server with `npm run dev`.
<br>
Key highlights of this project was integrating JWTs stateless authentication in react. The main blog server is an express backend 
that uses postgres and responds to api requests with json responses. I implemented role based access control (RBAC) with a ton 
of middleware to prevent unauthorized access to the best of my ability at the time of build. <br>

On the client side, I stored the access token (short-lived) in react memory with a context provider, and stored the refresh token 
(long-duration) in a httpOnly cookie. Using LocalStorage is not safe for sensitive data, and I tried to avoid it as much as possible.

When the refresh token expires, the user is forced to sign in again. While active, it can be used to authenticate new access tokens 
for persistent access on the client.

> [!Important]
> For the axios interceptor, I used `useLayoutEffect` which is a hook that's identical to useEffect but it runs synchronously.
    This allows it to block requests and attached the authorization header tokens before any request is sent.
  
### Learnings
Implemented a skeleton loader for the loading screens to mimic the outline of the components while authentication is 
ongoing or data is being fetched in the background. It doesn't fit well with the Authenticated landing page but it 
works okay for the rest of the application. Future projects will have optimized loading screens for each component.


### Dead Links
There are some dead links like the author page. User profiles are not required for project completion so I didn't bother building 
it out.


## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Environment Variables
```bash
NEXT_PUBLIC_EXPRESSURL="..."
NEXT_PUBLIC_CMSURL="..."
```