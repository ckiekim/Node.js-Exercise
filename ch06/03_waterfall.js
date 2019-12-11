var async = require('async');
async.waterfall([
    function task1(callback) {
        console.log('task1')
        callback(null, 'value');
    },
    function task2(arg, callback) {
        console.log('task2:', arg);
        callback(null, 'value1', 'value2');
    },
    function task3(arg1, arg2, callback) {
        console.log('task3:', arg1, arg2);
        callback(null, 'result');
    }],
    function(err, results) {
        console.log(results)
    }
);