var async = require('async');
async.waterfall([
    function task1(callback) {
        callback(null, 'value');
    },
    function task2(arg, callback) {
        callback(null, 'value1', 'value2');
    },
    function task3(arg1, arg2, callback) {
        callback(null, 'result');
    }],
    function(err, results) {
        console.log(results)
    }
);