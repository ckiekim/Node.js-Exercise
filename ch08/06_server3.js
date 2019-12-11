/*
 * 정적 파일을 서비스하는 방법
 */
var express = require('express');
var app = express();

app.use(express.static('.'));   // 정적 파일이 위치하는 폴더
app.get('/', function(req, res) {
    res.send(`
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
});
app.listen(3000, function() {
    console.log('Connected 3000 port');
});
