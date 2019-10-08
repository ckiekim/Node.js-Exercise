var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.access('./cat.jpg', function(err) {
		if ( err ) {
			res.statusCode = 404;
			res.end('Not found');
			return;
		}
		fs.readFile('./cat.jpg', function(err, data) {
			res.statusCode = 200;
			res.setHeader('Content-type', 'image/jpg');		
			res.end(data);
		});
		
	});
}).listen(3000);