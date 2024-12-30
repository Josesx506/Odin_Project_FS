### Installing Jest
Jest is a test-runner for auto-running unit- and integration- tests in JS. It lints test results and improves CI-integration pipelines.
- Initialize a npm package `npm init`, and fill the interactive entries like the package name etc.
- Install *jest* as a developer package `npm i --save-dev jest`
- Create a module script e.g. `sum.js`. This will contain the functions that should be tested.
- Create a test script e.g. `sum.test.js`. This will contain the tests that should be run on the target module functions.
    The test will be designed as 
    ```JS
    test("Error message", ()=> {
        expect("Test body").toBe("Test Result");
    })

    it("Addition Check", ()=> {
        expect(1+1).toBe(2);
    })
    ```
    Change the "Test body" and "Test Result" actual code logic. Global helpers for the test can be defined with either `test()` or `it()`.
-  ***Matchers*** in tests and used to compare obtain results to expected results *e.g. `.toBe()`,`.toContain()`, `.toThrow()` etc*. More on 
matchers can be found on the jest website [here](https://jestjs.io/docs/using-matchers).
- Update the `package.json` file test command from `"test": "echo \"Error: no test specified\" && exit 1"` to `"test": "jest"`
    ```bash
    {
    "name": "test-runners",
    "version": "1.0.0",
    "description": "unit-tests with jest",
    "main": "index.js",
    "scripts": {
        "test": "jest"
    }
    }
    ```
- Execute the test manually with `npm test` or 
- run tests automatically by updating the scripts key in the `package.json` file
    ```bash
    {
    "name": "test-runners",
    "version": "1.0.0",
    "description": "unit-tests with jest",
    "main": "index.js",
    "scripts": {
        "test": "jest",
        "watch": "jest --watch *.js"
    }
    }
    ```
    and execute `npm run watch` in terminal to interactively run the tests as you update the test script.