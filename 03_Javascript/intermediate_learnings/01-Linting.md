### Linting
Linting is the way code is formatted / style e.g. number of tabs, function naming nomenclature etc. They are available for many languages. In JS, the popular linter is [ESLint](https://eslint.org/). It can be installed with `npm init @eslint/config@latest`. <br>
Linters can be used to statically format code for consistency across a codebase by specifying a configuration. Configuration files should not be too restrictive so that they don't frustrate other collaborators in a codebase. You can use a config file from npm like
```bash
npm init @eslint/config@latest -- --config eslint-config-standard
```
or set a custom config file named `eslint.config.js` in your directory. Running `npm init @eslint/config` automatically creates the `eslint.config.js` file in your local directory. To format a file after writing it, you can use npx or yarn package managers.
```bash
npx eslint yourfile.js
```
This assumes a `package.json` file has already been created. ***Global installs are not recommended*** and additional setup instructions can be found on the [eslint website](https://eslint.org/docs/latest/use/getting-started). <br>

### ESLint Configuration
Configuration recommendations can be found [here](https://eslint.org/docs/latest/use/configure/). A vscode extension for providing best practice coding recommendations can be found [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Prettier
Prettier is similar to a linter, but serves a slightly different function. Prettier will take your JS code and then automatically format it according to a set of rules. It doesn't just throw errors, it actually updates your code e.g. changing your tabs from 4 to 2 spaces automatically. <br>

Unlike a linter, it’s not looking for style errors, but specifically targeting the layout of your code and making intelligent decisions about things like spaces, indentation levels and line-breaks. <br>

Here's a short intro video to *[Prettier](https://www.youtube.com/watch?v=hkfBvpEfWdA)* from its creator. Setup instructions can be found on its [github repo](https://github.com/prettier/prettier-vscode). Using prettier makes coding faster and easier! You don’t have to worry about nailing things like indentation, or remembering every semi-colon because prettier will take care of those details for you. <br>

It is recommended to use ESLint and Prettier for projects. Project folder structures can be saved as [github templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) and adopted for future project repo setup.