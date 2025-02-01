### Github
I followed this example [tutorial](https://www.youtube.com/watch?v=Q9n2mLqXFpU).
1. Create a repo online and pull the repo locally.
2. Copy the react app folder into the repo directory
3. Install github pages dependency `npm install gh-pages --save-dev`
4. Modify the next.config.mjs file
    ```JS
    const nextConfig = {
        output: "export", // Generates static files for deployment
    };
    ```
5. Modify the `package.json` file 
    - Add a homepage key `"homepage": "http://<github_user_name>.github.io/<repository_name>",`
    - Modify the scripts key and add the following keys
        ```JSON
        "scripts": {
            "predeploy": "npm run build",
            "deploy": "gh-pages -d out",
        }
6. Run the following commands `npm run build` and `npm run deploy` to build the prod version, and push to github.
    The github pages appeared to render a static file without any styling
7. So I switched to using github actions. github actions has a default NextJS template for deployment which renders the styling and 
    functionality correctly. Note: The **`package.json`** file must be include for it to run the gh-actions successfully.


### Vercel
1. Go to the vercel [website](https://vercel.com/new).
2. Import your git repository with the standalone project and click `publish`. 
    It publishes the site as a vercel app and creates an endpoint for you.
3. It includes a CI/CD pipeline to main like github actions and subsequent commits to main trigger a redeployment.
4. You can deploy the same repo to vercel and github pages - https://odin-memory-card-react.vercel.app/