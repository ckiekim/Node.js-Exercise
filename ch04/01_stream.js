var fs = require('fs');

var os = fs.createWriteStream('./output.txt');
os.on('finish', function(src) {
	console.log('finish event');
});

os.write('1234');
os.write('5678');
os.end('90');
