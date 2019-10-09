var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function(error, filelist) {
                //console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                for (var i=0; i<filelist.length; i++) {
                    var file = filelist[i].substring(0, filelist[i].length-4);
                    //list += '<li><a href="/?id=${file}">${file}</a></li>'
                    list += '<li><a href="/?id=' + file + '">' + file + '</a></li>'
                }
                list += '</ul>';
                //console.log(list);
                var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>${title} to WEB</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                var list = '<ul>';
                for (var i=0; i<filelist.length; i++) {
                    var file = filelist[i].substring(0, filelist[i].length-4);
                    list += '<li><a href="/?id=' + file + '">' + file + '</a></li>'
                }
                list += '</ul>';
                fs.readFile('data/'+queryData.id+'.txt', 'utf8', function(err, description) {
                    var title = queryData.id;
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);