var express = require('express');
var favicon = require('express-favicon');

var app = express();
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/nodejs.png'));
//app.use(favicon('bootstrap.png'));

var view = require('./view/index');
var html = view.index();

app.get('/', function(req, res) {
    res.writeHead(200);
    res.end(html);
});

app.listen(3000);