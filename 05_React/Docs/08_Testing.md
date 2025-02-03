### Testing in react
Testing in React can be done with `vitest`, and I'll be following this [example](https://www.robinwieruch.de/vitest-react-testing-library/).
- Create a testing project with `npm create vite@latest 05_react_tests -- --template react`
- Navigate into the folder and install vitest as a dev dependency `npm install vitest --save-dev`
- Add the `"test": "vitest"` key to your package.json scripts
    ```json
    {
    ...
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "test": "vitest",
        "preview": "vite preview"
    },
    ...
    }
    ```
- Create an `App.test.jsx` and put the example tests in it. It uses describe, it, expect, and test syntax just like Jest.
- Run all your tests with `npm run test` or run individual tests with `npm test App.test.jsx`

React Testing Library extends vitest, allowing us to test rendered HTML from react components. Follow the example above. Vitest is a great replacement for Jest, because it is faster, more modern, and gains lots of traction these days.


### React testing library packages
The `@testing-library` packages that were installed in the tutorial are useful because.
- `@testing-library/react` will give us access to useful functions like render which we’ll demonstrate later on.
- `@testing-library/jest-dom` includes some handy custom matchers (assertive functions) like toBeInTheDocument and more. 
    (complete list on [jest-dom’s github](https://github.com/testing-library/jest-dom)). Jest already has a lot of matchers so this 
    package is not compulsory to use.
- `@testing-library/user-event` provides the userEvent API that simulates user interactions with the webpage.

With the testing library, you can target component id, classes, textContent etc to verify that the components exist, and that they're rendering as 
desired. You can also test for userEvents like clicks, and associated click events that should manipulate the dom when activated.