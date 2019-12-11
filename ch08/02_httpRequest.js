var http = require('http');
var server = http.createServer(function(req, res) {

	console.log('Method : ', req.method);
	console.log('url : ', req.url);
	console.log('============= Headers ================')
	console.log('headers : ', req.headers['user-agent']);
			
	res.write('<h1>Hello World</h1>');
	res.end();
}).listen(3000);