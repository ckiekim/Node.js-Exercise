var fs = require('fs');

try {
   var data = fs.readFileSync('./hello.txt', 'utf-8');
   console.log(data);	
} catch ( error ) {
	console.error('Error:', error);
}

fs.readFile('./helloWorld.txt', 'utf-8', function(err, data) {
   if (err) {
      console.error('File Read Error : ', err);
      return;
   }
   console.log('File :', data)
});
