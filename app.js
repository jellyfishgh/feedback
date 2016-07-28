const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const mime = require('mime');
const request = require('request');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const apiHost = 'localhost:3001';
const routes = {
    '/mobile/feedback/api/problem': {
        method: 'POST',
        handler: createPostHandler()
    },
    '/mobile/feedback/api/answer': {
        method: 'POST',
        handler: createPostHandler()
    },
    '/mobile/feedback/api/myproblems': {
        method: 'GET',
        handler: createGetHandler()
    },
    '/mobile/feedback/api/problemdetail': {
        method: 'GET',
        handler: createGetHandler()
    }
    // '/imgServer': {
    //     method: 'POST',
    //     handler: function(req, res) {
    //         console.log(request.headers);
    //         var body = [];
    //         request.on('data', function(chunk) {
    //             body.push(chunk);
    //         }).on('end', function() {
    //             body = Buffer.concat(body);
    //             console.log(body);
    //         });
    //     }
    // }
};

function createPostHandler() {
    return function(api, req, res) {
        var body = [];
        request.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            console.log(body);
            request.post({
                url: api,
                form: querystring.parse(body)
            }, function(err, httpResponse, body) {
                console.log(body);
                res.end(body);
            });
        });
    };
}

function createGetHandler() {
    return function(api, req, res) {
        const search = url.parse(req.url).search;
        request(`${api}${search}`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.end(body);
            }
        });
    };
}

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url);
    const pathname = urlObject.path === '/' ? 'html/index.html' : urlObject.pathname;
    console.log(pathname);
    if (routes[pathname]) {
        if (req.method === routes[pathname].method) {
            routes[pathname].handler(`${apiHost}${pathname}`, req, res);
        }
    } else {
        const file = path.join('public', path.normalize(pathname.replace(/\.\./g, '')));
        fs.access(file, fs.R_OK, (err) => {
            if (err) errHandler(res, 404, '你访问的页面不存在。');
            else fs.stat(file, (err, stats) => {
                if (!stats.isFile()) errHandler(res, 403, '非法请求。');
                else {
                    const ifModifiedSince = req.headers['if-modified-since'];
                    const mtimeUTCString = stats.mtime.toUTCString();
                    if (ifModifiedSince && mtimeUTCString === ifModifiedSince) {
                        res.statusCode = 304;
                        res.end();
                    } else {
                        const acceptEncoding = req.headers['accept-encoding'];
                        const readStream = fs.createReadStream(file);
                        res.setHeader('Content-Type', `${mime.lookup(file)};charset=utf-8`);
                        var maxAge = 0; //2592000
                        res.setHeader('Cache-Control', `public,max-age=${maxAge}`);
                        res.setHeader('Last-Modified', mtimeUTCString);
                        if (acceptEncoding && acceptEncoding.indexOf('gzip') != -1) {
                            res.writeHead(200, {
                                'content-encoding': 'gzip'
                            });
                            readStream.pipe(zlib.createGzip()).pipe(res);
                        } else if (acceptEncoding && acceptEncoding.indexOf('deflate') != -1) {
                            res.writeHead(200, {
                                'content-encoding': 'deflate'
                            });
                            readStream.pipe(zlib.createDeflate()).pipe(res);
                        } else {
                            res.writeHead(200);
                            readStream.pipe(res);
                        }
                    }
                }
            });
        });
    }
});

function errHandler(res, code, msg) {
    res.writeHead(code, {
        'Content-Length': Buffer.byteLength(msg),
        'Content-Type': 'text/plain;charset=utf-8'
    });
    res.end(msg);
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});