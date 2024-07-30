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