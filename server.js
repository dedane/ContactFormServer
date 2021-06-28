const http = require('http');
const app =require('./index');
//starts on port 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);