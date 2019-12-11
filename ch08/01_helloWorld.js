var http = require('http');
var server = http.createServer(function(req, res) {
	res.write('<h1>Hello World</h1>');
	res.end();
});

server.listen(3000);
