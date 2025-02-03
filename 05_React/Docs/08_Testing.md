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

### Mocking
You can mock callbacks for click events or child components with vitest. When mocking click events, 
- for better readability, it is recommended that all setups be done in the same test block.
    - you can also use `beforeEach` block in every test block
- It is recommended to invoke userEvent.setup() before rendering the component. 
- It is discouraged to call renders and userEvent functions outside of the test itself, (for example, in a beforeEach block). 
- If you find yourself repeating the same code in multiple tests, the recommended approach to shorten each test is to 
    [write a setup function](https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent).


An example of a mocked child component is 
```JS
jest.mock('../submission', () => ({ submission, isDashboardView }) => (
  <>
    <div data-test-id="submission">{submission.id}</div>
    <div data-test-id="dashboard">{isDashboardView.toString()}</div>
  </>
));
```