function sayHello() {
	console.log('Hello World');
}
sayHello();
setTimeout(function() {
	sayHello();
}, 2*1000);

// 반복
setInterval(function() {
	sayHello();
}, 2*1000);