var cluster = require('cluster');

if (cluster.isMaster) {
    var worker = cluster.fork();
    cluster.on('online', function(worker) {
        // 워커 생성 후 실행
        console.log('Worker #' + worker.id + ' is Online.');
        worker.send("Hi, Worker!!!")
    });
    cluster.on('exit', function(worker, code, signal) {
        // 워커 종료 이벤트
        console.log('Worker #' + worker.id + ' exit.');
    });
    worker.on('message', function(data) {
        // 워커가 보낸 메시지
        console.log('Message from Worker #' + worker.id + ' : ' + data);
    });
} else {
    var worker = cluster.worker;
    worker.on('message', function(data) {
        // 마스터가 보낸 메세지
        console.log('Message from Master :', data)
        process.send("This is worker. How are you?")
    });
    // 워커 종료
    worker.kill();
}