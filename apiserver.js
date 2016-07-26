const http = require('http');
const request = require('request');

const dbserver = 'localhost:3002';
const server = http.createServer((req, res) => {

});

server.listen(3001, 'localhost', () => {
    let address = server.address();
    console.log(`api server running at ${address.address}:${address.port}`);
});