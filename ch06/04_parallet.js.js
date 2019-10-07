var async = require('async');
async.parallel([
    function task1(callback) {
        callback(null, 'Task1 result');
    },
    function task2(callback) {
        callback(null, 'Task2 result');
    },
    function task3(callback) {
        callback(null, 'Task3 result');
    }],
    function(err, results) {
        console.log(results)
    }
);