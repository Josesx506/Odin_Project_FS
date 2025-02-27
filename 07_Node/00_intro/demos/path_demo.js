const path = require('path');

// path methods
console.log(path.basename(__filename));
console.log(path.dirname(__filename));
console.log(path.join(path.dirname(__filename),"newfile.js"))
console.log(path.parse(__filename));
