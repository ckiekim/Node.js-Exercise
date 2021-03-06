var http = require('http');
var querystring = require('querystring');

var movieList = [{ title: '스타워즈4', director: '조지루카스' }];

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'post') {
        addNewMovie(req, res);
    } else {      // get이면 목록 출력
        showList(req, res);
    }
});
server.listen(3000);

function showList(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    lis = '';
    movieList.forEach(function (item) {
        lis += `<li>${item.title}(${item.director})</li>`
    }, this);
    res.write(`
        <!doctype html>
        <html>
        <head>
            <title>Favorite Movie</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h3>Favorite Movie</h3>
            <div><ul>
                ${lis}
            </ul></div>
            <form method="post" action="."><h4>새 영화 입력</h4>
                <div><input type="text" name="title" placeholder="영화제목"></div>
                <div><input type="text" name="director" placeholder="감독"></div>
                <input type="submit" value="upload">
            </form>
        </body>
        </html>
    `);
    res.end();
}

function addNewMovie(req, res) {
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        var data = querystring.parse(body);
        var title = data.title;
        var director = data.director;
        
        movieList.push({title:title, director:director});
        
        res.statusCode = 302;   // Redirection - 클라이언트 주소 이동
        res.setHeader('Location', '.');
        res.end();
    });
}
