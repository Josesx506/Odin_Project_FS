const fs = require('node:fs');
const content = 'Some content!';

// Asynchronous write
fs.writeFile('junk/test_async.txt', content+" Async write", err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

// Synchronous write
try {
  fs.writeFileSync('junk/test_sync.txt', content+" Sync write");
  // file written successfully
} catch (err) {
  console.error(err);
}

// Async promises for creating files
const fsp = require('node:fs/promises');
async function example() {
  try {
    // flag can be  { flag: 'a+' } for appending too
    await fsp.writeFile('junk/test_promises.txt', content+" Promises",  { flag: 'w' }, err => {});
  } catch (err) {
    console.log(err);
  }
}
example();


// Async promises for appending text to files
async function example2() {
    try {
      await fsp.appendFile('junk/test_promises.txt', "\n" + content + " Appended line");
    } catch (err) {
      console.log(err);
    }
}
example2();


// Asynchronous read file
fs.readFile('junk/test_async.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
});


// Synchronous read file
try {
    const data = fs.readFileSync('junk/test_sync.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
}


// Promises read file
async function example3() {
    try {
      const data = await fsp.readFile('junk/test_promises.txt', { encoding: 'utf8' });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
}
example3();





// Event emitters
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const eventEmitter2 = new EventEmitter();


eventEmitter.on('start', () => {
    console.log('started event emitter');
});

eventEmitter.emit('start');


eventEmitter2.on('start', (start, end) => {
    console.log(`started event emitter from ${start} to ${end}`);
});

eventEmitter2.emit('start', 1, 100);