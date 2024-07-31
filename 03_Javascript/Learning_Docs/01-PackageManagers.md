### Installation
On my mac, I first installed 
- node version manager **nvm** with brew using `brew install nvm`. Additional detals can be foound [here](https://formulae.brew.sh/formula/nvm). This allowed me to manage multiple *Node.js* versions. Similar to anaconda.
- install node package manager **npm** by running `nvm install <versionNumber>`. This allows you to run and install different versions of node and npm. Similar to a python version. Additional details can be found [here](https://dev.to/ms314006/how-to-install-npm-through-nvm-node-version-manager-5gif). An example from the nodejs website is
    ```bash
    # installs NVM (Node Version Manager)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # download and install Node.js
    nvm install 20

    # verifies the right Node.js version is in the environment
    node -v # should print `v20.12.2`

    # verifies the right NPM version is in the environment
    npm -v # should print `10.5.0`
    ```
    You need to have installed the package manager to follow the rest of this file. 
- The [npx](https://docs.npmjs.com/cli/v10/commands/npx) command allows you to run an arbitrary command from a local or remote npm package (no installation required for remote). e.g. `npx terminalizer record demoScreen` will allow you to record your terminal without local installation of the terminalizer package (Press`CTRL+D` to stop the recording if you tested it).

### Getting started with packages
- Packages files are akin to python requirement files. To create a package.json file, run `npm init` from terminal. This brings up some required prompts for you to answer following which it creates a ***package.json*** in your working directory. Additional details can be found [here](https://docs.npmjs.com/creating-a-package-json-file).
- You can set default config options for the init command. For example, to set the default author email, author name, and license, on the command line, run the following commands:
    ```bash
    > npm set init-author-email "example-user@example.com"
    > npm set init-author-name "example_user"
    > npm set init-license "MIT"
    ```
- When defining packages in the packages.json file, it is good to separate development only dependencies into the `devDependencies` key in the json file, and dependencies that are used in producton and dev environments into the `dependencies`. This is especially important when you need to run apps on small environments like AWS Lambda where the ***npm modules*** folder size has to be limited to fit. Additional details can be found [here](https://dev.to/mshertzberg/demystifying-devdependencies-and-dependencies-5ege).
    - When installing a package that will be bundled into your production bundle, you should use `npm install --save`. If you're installing a package for development purposes (e.g. a linter, testing libraries, etc.) then you should use `npm install --save-dev`. 
- A potential package manager replacement for npm is [Yarn](https://yarnpkg.com/en/) but the differences and optional.
- Packages can then be installed with `npm install <packageName>` for individual manual installs, or `npm install` if all package versions have been defined in a package.json file.
- To use the packages in a browser, we need a **bundler**. A bundler recursively checks all the import statements in a entry point file (starting file for the app, usually `index.js`), it then iterates through all the installed packages and creates a dependency graph (file paths to all the json files). The import statements are then bundled into a single js file that can be loaded into the browser. This way only the bundled output file needs to be imported into the html file versus linking a js file for each dependency package.
    ```html
    <head>
        <script type="text/javascript" src="bundle.js"></script>
    </head>
    ```
- Apart from making dependency management easy, it also helps to transcribe code for older browser versions and manage dependency update. There are different module bundlers, and the final choice depends on the project size / performance requirements but the most popular one is ***`webpack`***. Additional details on budler pros and cons can be found [here](https://snipcart.com/blog/javascript-module-bundler).
- A simple tutorial example for using webpack can be found [here](https://webpack.js.org/guides/getting-started/).The "source" code is the code that we'll write and edit. The "distribution" code is the minimized and optimized output of our build process that will eventually be loaded in the browser. They should typically be separated into folders `src` and `dist`.
- Packages can also be uninstalled with `npm uninstall css-loader csv-loader json5 style-loader toml xml-loader yamljs`. In this example we uninstall multiple packages used in a webpack test example.
- Quick tip: If you run `npx webpack --watch` you will not have to rerun webpack every time you make a change.

### Dealing with modules
After completing the webpack tutorial and reading all the setup requirements, I was finally ready to code. An example of an import export implementation is 
```JS
// a file called functionOne.js
const functionOne = () => console.log('FUNCTION ONE!');
export { functionOne };
```
Import the exported function
```JS
// another JS file
import { functionOne } from './functionOne';
functionOne(); // this should work as expected!
```
There are many benefits to writing your code in modules. One of the most compelling is code reuse. If, for instance, you have written some functions that manipulate the DOM in a specific way, putting all of those into their own file as a ‘module’ means that you can copy that file and reuse it very easily!
- Keep in mind that you can definitely export constructors, classes and factory functions from your modules. Modules can be imported/exported from different files using a `from` statement.
    ```JS
    // a file called myModule.js
    const functionOne = () => 'ONE';
    const functionTwo = () => 'TWO';

    export {
        functionOne,
        functionTwo
    };
    ```
    Import them into a different file
    ```JS
    // index.js in /src folder
    import {functionOne, functionTwo} from './myModule';
    ```
    Using this pattern gives you the freedom to only import the functions you need in the various files of your program. So it’s perfectly fine to only import functionOne if that’s the only one you need.
- You can also include the `default` keyword on one of your exports, so you should limit it to the main class / module in a file e.g. `export default User`, where User is name of the main function in a file `user.js`
- When specifying file paths for import statements, `./filename.js` indicates a relative path while `/filename/js` is used for absolute paths.
- For the example implementation, I launched the `dist/index.html` file with liveserver to view the changes.
- If you're using import statements directly in JS without webpack, the script element in your html file should have
    ```html
    <script type="module" defer src="main.js"></script>
    ```
    This is not directly relevant. ES6 Modules like this example of the script implementation are not supported by every browser and require transpiling which module bundlers like webpack help us resolve.