function task1(callback) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		callback();
	}, 300);
}


function task2(callback) {
	console.log('Task2 시작');
	setTimeout(function() {
		console.log('Task2 끝');
		//callback();
	}, 200);
}

// 아래와 같이 실행하면 task1이 끝난 후 task2가 실행되지 않음
/* task1();
task2(); */

task1(function() {
	task2(function() {
		
	});
});
