let fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');

const MIMETYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}

let server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    console.log(`收到来自：${pathname}的请求！`);
    fs.exists(pathname, (exist) => {
        if (!exist) {
            res.write(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404\n Not Found! \n');
            res.end();
        } else {
            let ext = path.extname(pathname);
            ext = ext ? ext.slice(1) : 'unknown';
            let contetType = MimeType[ext] || 'text/plain';
            fs.readFile(realPath, "binary", (err, file) => {
                res.writeHead(200, {
                    'Content-Type': contetType
                });
                res.write(file, "binary");
                res.end();
                fs.readFile();
            });
        }
    });

});

server.listen(80);
console.log('静态资源服务器启动');