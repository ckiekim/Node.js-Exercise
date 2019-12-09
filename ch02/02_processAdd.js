// 0, 1 확인
console.log('argv[0]: '+process.argv[0]);
console.log('argv[1]: '+process.argv[1]);

var i = process.argv[2];
var j = process.argv[3];
var sum = parseInt(i) + parseInt(j);
console.log(i + ' + ' + j + ' = ' + sum); // result
