var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

function htmlString(list, navBar, title, description) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Web-CR</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">Web 프로그래밍 기술</a></h1>
            <h3>${list}</h3>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <h2>${title}</h2>
            <p>${description}</p>
        </body>
        </html>
    `;
}
function htmlList(filelist) {
    var list = '<ul>';
    for (let file of filelist) {
        let _file = file.substring(0, file.length-4);
        list += `<li><a href="/?title=${_file}">${_file}</a></li>`; 
    }
    list += '</ul>';
    return list;
}

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
            let navBar = '<a href="/">홈으로</a>&nbsp;&nbsp;<a href="/create">글쓰기</a>';
            let description = `웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
            제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
            다양한 웹 기술을 배워보세요.`;
            fs.readdir('./data', function(err, filelist) {
                let list = htmlList(filelist);
                let template = htmlString(list, navBar, title, description);
                res.writeHead(200);
                res.end(template);
            });
        } else {
            title = queryData.title;
            let navBar = '<a href="/">홈으로</a>';
            fs.readdir('./data', function(err, filelist) {
                let list = htmlList(filelist);
                fs.readFile(`./data/${title}.txt`, 'utf8', function(err, description) {
                    let template = htmlString(list, navBar, title, description);
                    res.writeHead(200);
                    res.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        let title = '새 글 작성'
        let navBar = '<a href="/">홈으로</a>';
        fs.readdir('./data', function(err, filelist) {
            let list = htmlList(filelist);
            let template = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>File Web</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Web 프로그래밍 기술</h1>
                    <h3>${list}</h3>
                    <hr>
                    <h4>${navBar}</h4>
                    <hr>
                    <h2>${title}</h2>
                    <form action="/create_proc" method="post">
                        <p><input type="text" name="title" placeholder="제목"></p>
                        <p><textarea name="description" rows="10" cols="80" placeholder="설명"></textarea></p>
                        <p><input type="submit"></p>
                    </form>
                </body>
                </html>            
            `;
            res.writeHead(200);
            res.end(template);
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
                res.writeHead(302, {Location: `/?id=${title}`});
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