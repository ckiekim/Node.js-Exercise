var http = require('http');
var url = require('url');

var htmlStatic = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Static Web</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Web 프로그래밍 기술</h1>
        <h3><ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
        </ul></h3>
        <hr>
        <p>웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
        제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
        다양한 웹 기술을 배워보세요.</p>
    </body>
    </html>
`;

var app = http.createServer(function(req, res) {
    let _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    console.log(queryData);
    if (pathname === '/') {
        res.writeHead(200);
        res.end(htmlStatic);
    } else if (pathname === '/favicon.ico') {

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);