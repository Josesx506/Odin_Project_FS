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