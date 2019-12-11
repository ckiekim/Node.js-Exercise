var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log(req.url, '-', req.method);
    if (req.url == '/' && req.method.toLowerCase() == 'get') {
        res.statusCode = 200;
		res.setHeader('Content-type', 'text/html');		
        res.end(`
            <!doctype html>
            <html>
            <head>
                <title>Node.js server</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Hello Kitty</h1>
                <hr>
                <img src="cat.jpg" width="400" height="600">
            </body>
            </html>
        `);
    } else if (req.url == '/cat.jpg' && req.method.toLowerCase() == 'get') {
        var path = __dirname + req.url;
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        fs.createReadStream(path).pipe(res);
    }

}).listen(3000);