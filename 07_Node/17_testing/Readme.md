### Testing Config
Running jest with ES6 module syntax requires a special `package.json` setup. Install express, jest, and supertest with 
npm as dev dependencies, then add the following to your package config.
```JSON
  "scripts": {
    "test": "NODE_OPTIONS='--experimental-vm-modules' jest *.js",
    "watch": "NODE_OPTIONS='--experimental-vm-modules' jest --watch *.js"
  },
  "type": "module",
```