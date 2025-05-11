This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


### Supabase Setup
- Install the supabase package `npm install @supabase/supabase-js`. 
- On your browser, go to https://supabase.com/dashboard, and configure a project.
    - Extract the supabase *url* and *anon_key* from your project settings and add it to your environment file.
- Create a bucket, you can make the bucket private or public, but I made it public to make it easier to view uploads
    - Private buckets are more secure but would require creating a signed url that expires everytime the image is rendered.
- Create a config file and add the environment variables to an instance of the supabase client
    ```JS
    import { createClient } from "@supabase/supabase-js";

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    export { supabaseClient, supabaseBucket }
    ```
- You can then use the client to upload files or retrieve file urls.
    ```JS
    // Upload
    let { data, error } = await supabaseClient.storage.from(supabaseBucket).upload(filePath, file);
    // Get file url
    const { data: publicUrl }  = await supabaseClient.storage.from(supabaseBucket).getPublicUrl(filePath);
    ```
- The `publicUrl` can be persisted in the db and rendered during chats
- I used these 2 videos [v1](https://www.youtube.com/watch?v=OM9VOxHjTNs&list=PLfnoK2CRLXp0aOrP3iAbj0R2ACVNXRYR-&index=48) and 
    [v2](https://www.youtube.com/watch?v=25hbImI36zA) for guidance, then integrated the logic into my MessageInput component. This replaces 
    the FileUploader component in video 2.

### Todo
- [x] handle logic for file uploads to supabase
- [ ] create logic to show active chat in chat history list
- [ ] implement ai conversations
- [ ] show user online status
