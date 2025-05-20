### Odin Book aka [J].
This is my capstone project for the Odin project fullstack development track with JS. We were tasked with building a social 
media app and I chose X since I'm more familiar with it. Renamed it to J cause why not and maintained the black and white 
theme. No dark theme cause I don't use it. It took a while to build and I wanted to complete it before summer so I referenced 
prior projects like my chat app and e-commerce app instead of building chat and marketplace for this. The marketplace idea was 
from FB but how would you know if I didn't tell you. It's be 1.5 years of fullstack dev. I definitely feel better for it and I 
look forward to reading this again sometime in the future. Cheers to closing this chapter 🥂.

### Environment variables
Environment variables used on the ***frontend*** were
```bash
NEXT_PUBLIC_EXPRESSURL=
GITHUB_CLIENT_ID=
GUESTPSWD=
SUPABASE_BUCKET=
SUPABASE_URL=
SUPABASE_ANON=
```
The environment variables point to the backend express server, GitHub OAuth app client id, guest password for easy sign in, and 
supabase bucket details for image uploads. Unlike prior projects, only the backend url secret was exposed to the client. Other 
variables especially supabase was restricted to the server only. <br>

***Backend*** environment variables were
```bash
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
SESSION_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
PORT=
CLIENT_URL=
GUEST_PSWD=
NODE_ENV=production
```
The environment variables point to the postgres db, JWT secrets, passport session secret, GitHub OAuth details, express server port, 
frontend url, and guest password value respectively. <br>

> [!Note]
> Don't forget to include the `NODE_ENV` production so that the same site CORS option becomes 'None' or express wouldn't recognize your 
client-side cookies, and the users will get logged out after every page reload / refresh

> [!Caution]
> The backend express server and frontend react server will both run on PORT 3000 unless a port is specified in the environment 
variable to avoid clashes. In production, they're on 2 different instances so the impact is minimal.

### Running the app
- Run `npm run dev` to start either server in each folder to launch the app.
- Login as a guest user and explore
- Additional thoughts and feature descriptions are described in the readme for each feature

### Improvements
- [ ] Custom notfound 404 error component with Navbar integrated since I didn't include my nav in my app layout for this project

> [!Important]
> When specifying client and backend server routes in production whitelist for cors, ensure there are no trailing `'/'` in the url.

