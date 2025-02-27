const { randomUUID } = require('node:crypto');
const EventEmitter = require('node:events');

class Logger extends EventEmitter {
    log(msg) {
        // Emit a message with a random UUID
        this.emit("message", {
            id: randomUUID(),
            msg: msg,
        })
    }
}

const logger = new Logger() // new is called on class objects and not functions
logger.on("message", (data) => console.log("Called Listeners: ", data));

logger.log("Hello world!!");
logger.log("Hello node!!");
// Note: you can log the emitted events into a file with fs module

module.export = { Logger };