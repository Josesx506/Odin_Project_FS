const fs = require('node:fs');

const content = 'Some file system content!';

/**
 * Check if the file exists. if not clean up old file and create new ones
 */
const dirName = "junk";
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName)
} else {
  fs.rmSync(dirName, { recursive: true, force: true })
  fs.mkdirSync(dirName)
}

/**
 * Asynchronous read and write
 * 
 * fs.writeFile(filePath, fileData, callBack) {
 *  ...
 * }
 */
// Asynchronous write file
fs.writeFile(`${dirName}/test_async.txt`, content+" Async write", err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});

// Asynchronous read file
fs.readFile(`${dirName}/test_async.txt`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
});


/**
 * Synchronous read and write 
 *  - has no callback but must be wrapped in try-catch statement
 * fs.writeFileSync(filePath, fileData) {
 *  ...
 * }
 */
// Synchronous write
try {
  fs.writeFileSync(`${dirName}/test_sync.txt`, content+" Sync write");
  // file written successfully
} catch (err) {
  console.error(err);
}

// Synchronous read file
try {
    const data = fs.readFileSync(`${dirName}/test_sync.txt`, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
}


/**
 * Asynchronous read and write with promises
 *  - has to be used within an async function that has a 
 *      try-catch statement and async/await
 * async function funcName(**args) {
 *  ...
 * }
 */
const fsp = require('node:fs/promises');

// Async promises for creating files
async function asyncWrite() {
  try {
    // flag can be  { flag: 'a+' } for appending too
    await fsp.writeFile(`${dirName}/test_promises.txt`, content+" Promises",  { flag: 'w' }, err => {});
  } catch (err) {
    console.log(err);
  }
}

// Async promises for appending text to files
async function asyncAppend() {
    try {
      await fsp.appendFile(`${dirName}/test_promises.txt`, "\n" + content + " Appended line");
    } catch (err) {
      console.log(err);
    }
}

// Promises read file
async function asyncRead() {
    try {
      const data = await fsp.readFile(`${dirName}/test_promises.txt`, { encoding: 'utf8' });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
}
// Call the functions
asyncWrite();
asyncAppend();
asyncRead();


/**
 * Stream Input/Output of large files as chunks instead of rendering at once
 * This is useful for webpages where you can start rendering the data before 
 * the read operation fully loads. The readStream operation is triggered like 
 * an event emitter
 * 
 * readStream(topicName,anonymousFunction)
 */

// const { LoremIpsum } = require('lorem-ipsum');

// // Configure the Lorem Ipsum generator
// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4,
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4,
//   },
// });

// // Generate random  Lorem Ipsum text and write to a file with writeStream
// function generateLoremIpsumFile(filePath, paragraphCount) {
//   const stream = fs.createWriteStream(filePath, { flags: 'a' });
//   for (let i = 0; i < paragraphCount; i++) {
//     // Write the paragraph as a chunk and append it to the file
//     const paragraph = lorem.generateParagraphs(1);
//     writeStream.write('\nNEW CHUNK\n'); 
//     stream.write(paragraph + '\n\n');
//   }
//   stream.end();
// }
// generateLoremIpsumFile(`${dirName}/large_file_write.txt`,100);

// // Stream read the large file in chunks
// const readStream = fs.createReadStream(`${dirName}/large_file.txt`, {encoding:'utf8'});

// readStream.on('data', (chunk)=>{
//   // Print the large file to terminal 
//   console.log('--------- NEW CHUNK ---------');
//   console.log(chunk);
// })

// OR you can pipe the read operation into the write operation if the large already exists 
// readStream.pipe(writeStream);

