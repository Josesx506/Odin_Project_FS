### Create the first react app with Vite
1. Don't run this inside the current folder you want to work in. The command needs to create a new empty folder
    ```bash
    npm create vite@latest 01_first_react_app_vite -- --template react
    ```
2. Answer the prompt
    ```bash
    Need to install the following packages:
        create-vite@6.X.X
    Ok to proceed? (y)
    ```
3.  Navigate into the new directory
    ```bash
    cd my-first-react-app
    npm install
    npm run dev
    ```
4. Provided everything has gone according to plan, head over to `localhost:5173`, where you’ll be greeted with a landing page.


The `public` folder is where all of the static assets related to your app will go. This could include images, icons, and information files for the browser.
Inside the `src` folder is where you will find the code that runs your app. The `main.jsx` file here serves as the entry point of the application.
This is similar to the `dist` folder and `src/index.js` files in webpack. `main.jsx` imports the `App()` function from `App.jsx`. If you want to update 
the html being rendered, you need to edit the code inside `App.jsx` or create a new `.jsx` file that you can import your `App()` function from. <br><br>

Add the [React developer tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) chrome extension to your browser to enable easier debugging. 


### Deploying to github pages
Because the app requires a server to start, you can't link the html file to a static html file like all the previous odin projects up till now. You need to 
create its own public repo and then use github pages to render it. Example tutorials can be found [here](https://www.youtube.com/watch?v=Q9n2mLqXFpU) and in this [thread](https://stackoverflow.com/questions/69708281/how-can-i-host-my-react-application-using-github). Because this website is so simple, I didn't create a github page for hosting it.