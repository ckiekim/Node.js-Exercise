var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./view/template');

var app = http.createServer(function(req, res) {
    let _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    //console.log(queryData.title);
    if (pathname === '/') {
        var title;
        if (queryData.title === undefined) {
            //console.log(queryData.title);
            title = 'Welcome to Web World';
            let navBar = template.NavMain();
            let description = `웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
            제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
            다양한 웹 기술을 배워보세요.`;
            fs.readdir('./data', function(err, filelist) {
                let list = template.List(filelist);
                let html = template.Main(list, navBar, title, description);
                res.writeHead(200);
                res.end(html);
            });
        } else {
            title = queryData.title;
            let navBar = template.NavList(title);
            fs.readdir('./data', function(err, filelist) {
                let list = template.List(filelist);
                fs.readFile(`./data/${title}.txt`, 'utf8', function(err, description) {
                    let html = template.Main(list, navBar, title, description);
                    res.writeHead(200);
                    res.end(html);
                });
            });
        }
    } else if (pathname === '/create') {
        let navBar = template.NavOp();
        fs.readdir('./data', function(err, filelist) {
            let list = template.List(filelist);
            let view = require('./view/create');
            let html = view.create(list, navBar);
            res.writeHead(200);
            res.end(html);
        });
    } else if (pathname === '/create_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            //console.log(title, description);
            fs.writeFile(`data/${title}.txt`, description, 'utf8', function(error) {
                res.writeHead(302, {Location: `/?title=${title}`});
                res.end();
            });
        });
    } else if (pathname === '/update') {
        let navBar = template.NavOp();
        fs.readdir('./data', function(err, filelist) {
            let title = queryData.title;
            let list = template.List(filelist);
            fs.readFile(`./data/${title}.txt`, 'utf8', function(err, description) {
                let view = require('./view/update');
                let html = view.update(list, navBar, title, description);
                res.writeHead(200);
                res.end(html);
            });
        });        
    } else if (pathname === '/update_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var oldTitle = post.old_title;
            var title = post.title;
            var description = post.description;
            fs.rename(`./data/${oldTitle}.txt`, `./data/${title}.txt`, function() {
                fs.writeFile(`data/${title}.txt`, description, 'utf8', function(error) {
                    res.writeHead(302, {Location: `/?title=${title}`});
                    res.end();
                });
            });
        });
    } else if (pathname === '/delete') {
        let navBar = template.NavOp();
        fs.readdir('./data', function(err, filelist) {
            let title = queryData.title;
            let list = template.List(filelist);
            let view = require('./view/delete');
            let html = view.delete(list, navBar, title);
            res.writeHead(200);
            res.end(html);

        });
    } else if (pathname === '/delete_proc') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            fs.unlink(`./data/${title}.txt`, function(err) {
                res.writeHead(302, {Location: `/`});
                res.end();
            });
        });
    } else if (pathname === '/favicon.ico') {
		fs.readFile('./nodejs.png', function(err, data) {
			res.statusCode = 200;
			res.setHeader('Content-type', 'image/png');		
			res.end(data);
		});
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);