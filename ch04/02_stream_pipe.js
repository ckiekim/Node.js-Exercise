var fs = require('fs');

var os = fs.createWriteStream('./output2.txt');
os.on('pipe', function() {
	console.log('pipe event');
});

// 키보드에서 입력한 내용
var is = process.stdin;
/* 
is.on('data', function(data) {
	if (data.trim() == 'exit') {
		is.unpipe(os)
	}
}); 
*/

// 아웃풋 스트림(파일)로 연결
is.pipe(os);
