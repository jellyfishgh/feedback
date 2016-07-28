const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

// const request = require('request');
// const dbserver = 'localhost:3002';
const server = http.createServer((req, res) => {
    let method = req.method,
        urlObj = url.parse(req.url);
    let pathname = urlObj.pathname,
        searchObj = querystring.parse(urlObj.search);
    if (method === 'GET') {
        if (pathname === '/mobile/feedback/api/myproblems') {
            fs.readFile(path.join(__dirname, './public/data/problems.json'), 'utf-8', (err, data) => {
                if (err) throw err;
                let myproblems = JSON.parse(data);
                res.writeHead(200, {
                    'Content-Type': mime.lookup('.json')
                });
                res.end(JSON.stringify(myproblems[searchObj.uid]));
            });
        } else if (pathname === '/mobile/feedback/api/problemdetail') {
            fs.readFile(path.join(__dirname, './public/data/answers.json'), 'utf-8', (err, data) => {
                if (err) throw err;
                let answers = JSON.parse(data);
                res.writeHead(200, {
                    'Content-Type': mime.lookup('.json')
                });
                res.end(JSON.stringify(answers[searchObj.feedbackid]));
            });
        }
    } else if (method === 'POST') {
        if (pathname === '/mobile/feedback/api/problem') {
            let body = [];
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString();
                console.log(body);

            });
        } else if (pathname === '/mobile/feedback/api/answer') {
            let body = [];
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString();
                console.log(body);

            });
        }
    }
});

server.listen(3001, 'localhost', () => {
    let address = server.address();
    console.log(`api server running at ${address.address}:${address.port}`);
});