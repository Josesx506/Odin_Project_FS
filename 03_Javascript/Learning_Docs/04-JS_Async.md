### Asynchronous Code
Async functions are used when the a function takes sometime to execute e.g. reading data from an API/disk. If the logic tries to access the data before its available, we get an `undefined` error. To avoid this, we can use `Promise` functions in JS. Promises were designed to replace *callbacks* when possible and minimize callback hell.
```JS
const myData = getData() // if this is refactored to return a Promise...

myData.then(function(data){ // .then() tells it to wait until the promise is resolved
  const pieceOfData = data['whatever'] // and THEN run the function inside
})
```
Promise functions also have `resolve` and `reject` functions. If a promise is completed, it is resolved, and if it fails, it is rejected. Both functions can be used to exit the promise.
```JS
const p = new Promise(function(resolve, reject) {
	// Do an async task async task and then...
	if(/* good condition */) {
		resolve('Success!');
	}
	else {
		reject('Failure!');
	}
});

p.then(function(result) { 
	/* do something with the result */
}).catch(function() {
	/* error :( */
}).finally(function() {
   /* executes regardless or success for failure */ 
});
```
> [!Note] `then`, `catch`, and `finally` callbacks can also be used like try-except python equivalents to evaluate the output of a JS Promise.
- `then` method which allows you to react to the promise
- `catch` callback is executed when the promise is rejected
- `finally` callback is called regardless of success or failure

When multiple async interactions are initialized, but you only want to trigger a response when all of them are completed -- that's where `Promise.all()` comes in.  The *Promise.all* method takes an array of promises and fires one callback once they are all resolved. 
```JS
let request1 = fetch('/users.json');
let request2 = fetch('/articles.json');

// Result is an array
Promise.all([request1, request2]).then(function(results) {
	// Both promises done!
});
// or - unpacked `results` array in the callback declaration
Promise.all([request1, request2]).then(function([result1, result2]) {
	// Both promises done!
});
```
There's also `Promise.race` that triggers as soon as any promise in the array is resolved or rejected. <br><br>

When returning a promise, `new` keyword has to be added like a new instance of a constructor/class object.

### Replacing Callback with Promise example
```JS
// Callback function
function watchTutorialCallback(callback, errorCallback) {
  let userLeft = false
  let userWatchingCatMeme = false

  if (userLeft) {
    errorCallback({
      name: 'User Left', 
      message: ':('
    })
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: 'User Watching Cat Meme',
      message: 'WebDevSimplified < Cat' 
    })
  } else {
    callback('Thumbs up and Subscribe')
  }
}

// Promise function
function watchTutorialPromise() {
  let userLeft = false
  let userWatchingCatMeme = false
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: 'User Left', 
        message: ':('
      })
    } else if (userWatchingCatMeme) {
      reject({
        name: 'User Watching Cat Meme',
        message: 'WebDevSimplified < Cat' 
      })
    } else {
      resolve('Thumbs up and Subscribe')
    }
  })
}

// Calling the callback
watchTutorialCallback(message => {
  console.log(message)
}, error => {
  console.log(error.name + ' ' + error.message)
})

// Calling the promise
watchTutorialPromise().then(message => {
  console.log(message)
}).catch(error => {
  console.log(error.name + ' ' + error.message)
})
```

Another example to handle multiple promises asynchronously is 
```JS


const recordVideoOne = new Promise((resolve, reject) => {
  resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
  resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
  resolve('Video 3 Recorded')
})

// Trigger response when all of the promises are completed
Promise.all([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree
]).then(messages => {
  console.log(messages)
})

// Trigger response when at least one of the promises is completed
Promise.race([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree
]).then(message => {
  console.log(message)
})
```

Other tips can be found
- https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch2.md
- https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md


### Async / Await
`async` and `await` are syntactic wrappers around promises that make it easier to understand how the code is written. 
- `await` statements can ***only*** be called inside an `async` function. await literally suspends the function execution until the promise settles, and then resumes it with the promise result.
- `async` functions ***always*** return promises. It means you can't simply assign the results of an async function to a variable and print it out, you have to use the `.then()` method to trigger the promises.
  ```JS
  async function test_plus_5(num) {
    return num + 5
  };

  let val = test_plus_5(5);
  console.log(val);        // Return Promise object -> Promise { 10 }
  val.then(console.log);   // Return actual result -> 10
  ```
  The `then` statement defines what the returned promise should do when resolved

- Examples
  - Original fetch request with callbacks
    ```JS
    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        });
    }

    loadJson('https://javascript.info/no-such-user.json')
      .catch(alert); // Error: 404
    ```
  - Refactored fetch request with async functions
    ```JS
    async function loadJson(url) { // (1)
      let response = await fetch(url); // (2)

      if (response.status == 200) {
        let json = await response.json(); // (3)
        return json;
      }

      throw new Error(response.status);
    }

    loadJson('https://javascript.info/no-such-user.json')
      .catch(alert); // Error: 404 (4)
    ```
- When using `async` + `await`, be careful about awaiting too many requests. This can cause blocking especially when multiple requests can be obtained concurrently. 
  - `await` should only be used if the second request depends on the first request. e.g.
    ```JS
    async function getData(id) {
      let userName = await db.get(`SELECT name FROM users WHERE id = '${id}'`);
      let userPosts = await db.get(`SELECT * FROM posts WHERE username = '${userName}'`);

      return userPosts;
    };
    ```
  - In scenarios where, multiple promises can be obtained simulataneously, using await on each promise, blocks each function call and makes the overall implementation slower. Using `Promise.all([])` is a more efficient way of extracting the results concurrently. e.g.
    ```JS
    async function getFruit(name) {
      const fruits = {
        "pineapple": "🍍",
        "mango": "🥭",
        "banana": "🍌",
        "orange": "🍊",
        "strawberry": "🍓",
        "watermelon": "🍉",
      };

      await delay(1000) // 1 sec sleep to mimic api call

      return fruits[name];
    };

    async function badSmoothie() {
      // bad function call with blocking, runs in 2 secs
      const a = await getFruit("pineapple");
      const b = await getFruit("strawberry");

      return [a, b];
    };

    async function goodSmoothie() {
      // good function call with concurrent operations, runs in 1 sec
      const a = getFruit("pineapple");
      const b = getFruit("strawberry");
      const smoothie = await Promise.all([a, b]);

      return smoothie;
    };
    ```
    emojis link - [emojipedia](https://emojipedia.org/)