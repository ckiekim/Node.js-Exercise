var cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();
    cluster.on('online', function(worker) {
        // 워커 생성 후 실행
        console.log('Worker #' + worker.id + ' is Online.');
    });
    cluster.on('exit', function(worker, code, signal) {
        // 워커 종료 이벤트
        console.log('Worker #' + worker.id + ' exit.');
    })
} else {
    var worker = cluster.worker;
    console.log('Worker code.')
    // 워커 종료
    worker.kill();
}