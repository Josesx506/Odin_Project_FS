This is a Next.js project for the blog api admin panel. Blog post authors and site admins should be able to login here. 
Other users should log in at the basic page. Authors can only see posts that they write, admins can see posts from 
everyone.

## Getting Started

First install packages with `npm install`, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Admin Panel Routes 
These are the routes implemented with react router. They're different from the api calls made to the express server where 
the backend logic resides

| Route | Actions |
| :---- | :------ |
| `/` | Index page to show all the thumbnails for blogs the user has written |
| `/signup` | Signup |
| `/login` | Login |
| `/logout` | Logout |
| `/create` | Create a new post. No comment view |
| `/:id` | Unique page to view extended version of a blog post. You can also view existing comments |
| `/:id/edit` | Edit an existing post or modify comments here. Add new text, change the title etc. |

> [!Note]
> Comments are much shorter than posts, so it didn't make sense to create a dedicated page for them. Post owners 
    and Admins can edit comments that they created. Admins can delete any comment but cannot edit comments. Users 
    don't have access to this page.

All comment modifications, create/edit/delete are handled on the `/:id/edit` page using interactive functionality from react.


### Navbar Plans
- When logged out `| Home  | Sign In | Sign Up |`. Where Home is referencing the blog view routes without admin panel
- When logged In `| Home | My Posts | Create Post | Logout |`. Landing page will be My Posts


### Todo
- [ ] Reminder to create a time column for the comments data
- [ ] Include the nav bar in the layout component
- [ ] Include [tinyMCE](https://www.tiny.cloud/docs/tinymce/6/cloud-quick-start/) text editior if you like 
https://www.youtube.com/watch?v=UTPsWbfHmFg