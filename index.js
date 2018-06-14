const http = require('http');
const port = process.argv[2] || 3000;
const handlerFn = require('./handler');
const server = http.createServer(handlerFn);

server.listen(port);
console.log(`Server listening at http://localhost:${port}`);

