var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>${title} to WEB2</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB2</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
    `;
}

function templateList(filelist) {
    var list = '<ul>';
    for (var i=0; i<filelist.length; i++) {
        var file = filelist[i].substring(0, filelist[i].length-4);
        list += `<li><a href="/?id=${file}">${file}</a></li>`
    }
    list += '</ul>'; 
    return list;
}

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
                var list = templateList(filelist);
                //console.log(list);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
                                `<a href="/create">생성</a>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
                                `<a href="/create">생성</a> <a href="/update?id=${title}">수정</a>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB2 - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:3000/create_proc" method="post">
                    <p><input type="text" name="title" placeholder="제목"></p>
                    <p><textarea name="description" rows="10" cols="80" placeholder="설명"></textarea></p>
                    <p><input type="submit"></p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_proc') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            //console.log(title, description);
            fs.writeFile(`data/${title}.txt`, description, 'utf8', function(error) {
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    } else if (pathname === '/update') {
        fs.readdir('./data', function(error, filelist) {
            fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description) {
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list, `
                    <form action="/update_proc" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" value="${title}"></p>
                        <p><textarea name="description" rows="10" cols="80">${description}</textarea></p>
                        <p><input type="submit"></p>
                    </form>`,
                    `<a href="/create">생성</a> <a href="/update?id=${title}">수정</a>`);
                response.writeHead(200);
                response.end(template);
            });
        });
    } else if (pathname === '/update_proc') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}.txt`, `data/${title}.txt`, function(error) {
                fs.writeFile(`data/${title}.txt`, description, 'utf8', function(error) {
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);