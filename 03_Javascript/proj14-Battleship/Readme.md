### Project Setup
1. Switch nvm versions `nvm use v20.10.0`. 
2. Setup the project with `npm init`, fill the interactive entries, and save the *package.json* file.
3. Install dependencies with `npm install @fortawesome/fontawesome-free css-loader file-loader html-webpack-plugin style-loader @shopify/draggable webpack webpack-cli`.
4. Install dev dependencies for testing `npm install --save-dev @babel/core @babel/preset-env babel-jest jest`
5. Create the `webpack.config.js` file to setup webpack.
6. Create the `babel.config.js` to setup babel for testing with jest.
7. Launch `dist/index.html` with live-server and run `npx webpack --watch` so that you will not have to rerun webpack every time you make a change.

