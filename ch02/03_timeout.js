function sayHello() {
	console.log('Hello World');
}
sayHello();
setTimeout(function() {
	console.log('Timeout');
}, 1000);

var t = setTimeout(sayHello, 2*1000);
clearTimeout(t);
