var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1

app.get('/',function(req, res){  //2
    res.sendFile(__dirname + '/01_client.html');
});

var count=1;
io.on('connection', function(socket){           //3
    console.log('user connected: ', socket.id);     //3-1
    var name = "user" + count++;                    //3-1
    io.to(socket.id).emit('change name', name);     //3-1

    socket.on('disconnect', function() {                //3-2
        console.log('user disconnected: ', socket.id);
    });

    socket.on('send message', function(name, text){     //3-3
        var msg = name + ' : ' + text;
        console.log(msg);
        io.emit('receive message', msg);
    });
});

http.listen(3000, function(){ //4
    console.log('server on!');
});

/*
1. socket.io를 사용하는 경우 app를 http에 연결시키고, 이 http를 다시 socket.io에 연결시키는 과정이 필요합니다.
   이는 socket.io가 express를 직접 받아들이지 못하기 때문입니다. socket.io는 io라는 변수명으로 서버에서 사용됩니다.

2. 모든 request는 client.html를 response하도록 설정하였습니다.

3. 사용자가 웹사이트에 접속하게 되면 socket.io에 의해 'connection' event가 자동으로 발생됩니다.
   io.on(EVENT,함수)는 서버에 전달된 EVENT를 인식하여 함수를 실행시키는 event listener입니다.
   이때 함수에는 접속한 사용자의 socket이 parameter로 전달됩니다. 
   해당 접속자(socket)에 관련한 event들은 이 'connection' event listener 안에 작성되어야 합니다.

3-1. 'connection' event listener에 event가 발생하면 한번만 일어나는 코드들입니다.
   console.log로 접속자의 socket.id를 출력하고 사용자 이름을 만든 후 'change name'이란 event를 발생시킵니다. 
   emit는 '(빛 따위를) 발하다'라는 뜻으로 event를 발생시키는 함수입니다. 이 event는 client.html의 
   해당 event listener에서 처리됩니다. io.to(socket.id).emit 을 사용하여 해당 socket.id에만 event를 전달합니다.

3-2. socket.io(EVENT,함수)는 해당 socket에 전달된 EVENT를 인식하여 함수를 실행시키는 event listener입니다.
   접속자의 접속이 해제되는 경우 socket.io에 의해 'disconnect' event가 자동으로 발생됩니다. 
   console.log로 socket.id를 출력합니다.

3-3. 3-2와 처럼 socket.io를 사용한 'send message' event의 event listener입니다.
   이 event는 client.html에 작성된 사용자 정의 event로 접속자가 채팅메세지를 전송하는 경우에 발생합니다. 
   이 event는 채팅메세지를 보낸 접속자의 이름과 채팅메세지를 parameter로 함께 전달합니다. 
   'send message' event listener는 이 event를 받은 후 io.emit을 사용하여 모든 클라이언트들에게 event를 전달합니다.

4. app.listen이 아닌 http.listen임에 유의합시다.
 */