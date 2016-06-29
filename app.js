const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const mime = require('mime');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url);
    const pathname = urlObject.path === '/' ? '/index.html' : urlObject.pathname;
    const file = path.join("public", path.normalize(pathname.replace(/\.\./g, '')));
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
                            "content-encoding": "gzip"
                        });
                        readStream.pipe(zlib.createGzip()).pipe(res);
                    } else if (acceptEncoding && acceptEncoding.indexOf('deflate') != -1) {
                        res.writeHead(200, {
                            "content-encoding": "deflate"
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