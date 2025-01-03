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

### Mocking
Mocking is required when the units used to break the large problem down into smaller parts depend on each other. Put another way, *mocking 
is required when our supposed atomic units of composition are not really atomic*, and our decomposition strategy has failed to decompose 
the larger problem into smaller, independent problems. If the unit(modules, functions, classes) can't be tested without mocking dependencies, 
it’s tightly coupled to the mocked dependencies.<br>

***Don’t unit test I/O***. I/O is for integrations. Use integration tests, instead. It’s perfectly OK to mock and fake for **integration tests**.<br>

Create a mock test in JS using `jest.fn()`. The mock function can have a callback *e.g. `jest.fn(x => x+42)`*. You can also mock the return 
value directly e.g.
```JS
it("Mock tests", ()=> {
    const mock = jest.fn();
    // Hard code the return value - Can be repeated multiple times
    mock.mockReturnValueOnce(true).mock.mockReturnValueOnce("Hello");
    const results = mock();
    const results2 = mock();         // Second call to access the second return value
    expect(results).toBe(true);      // Test for the first mocked `true` value
    expect(results2).toBe("Hello");  // Test for the second mocked `"Hello"` value
})
```

Http requests can be mocked with jest too.
```JS
const axios = require("axios");

// Original function that needs to be mocked
const fetchData = async (id) => {
    // The returned object should have an id and data keys
    const results = await axios.get(`https://jsonplaceholder.typicode.com/${id}`);
    return results.data
}

test("Mock axios get request", async () => {
    // Use Jest to intercept calls to axios.get and return the mocked object instead of actually performing the HTTP request.
    // jest.spyOn(object, "methodName") - mock setup
    jest.spyOn(axios, "get").mockReturnValueOnce({
        data: {
            id: 1,
            todo: "Complete todo item"
        }
    });

    // Call the function where the mocked value will be returned instead of making api call
    const results = await fetchData(1);
    expect(results.todo).toBe("Complete todo item");
});
```

When you have to setup and teardown a db/data/file I/O before a series of tests in Jest, you can use the 
`beforeEach(), afterEach(), beforeAll(), afterAll()` functions. Check the [docs](https://jestjs.io/docs/setup-teardown) for additional info.