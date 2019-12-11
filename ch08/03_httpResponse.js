var http = require('http');
var server = http.createServer(function(req, res) {
	res.statusCode = 200;
	res.statusMessage = 'OKOK';
	res.setHeader('content-type','text/html');
	
	res.write('<h1>Hello World</h1>');
	res.end();
}).listen(3000);