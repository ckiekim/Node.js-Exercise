var socket = io('http://localhost:8080'); 
/* 접속 되었을 때 실행 */
socket.on('connect', function () {
    console.log('connect'); 
    /* 이름을 입력받고 */
    var name = prompt('반갑습니다!', '') 
    /* 이름이 빈칸인 경우 */ 
    if (!name) {
        name = '익명';
    } 
    /* 서버에 새로운 유저가 왔다고 알림 */ 
    socket.emit('newUser', name);
});

/* 메시지 전송 함수 */
function send() { 
    // 입력되어있는 데이터 가져오기 
    var message = document.getElementById('test').value; 
    console.log(message);

    // 가져왔으니 데이터 빈칸으로 변경 
    document.getElementById('test').value = ''; 

    // 내가 전송할 메시지 클라이언트에게 표시 
    var chat = document.getElementById('chat'); 
    var msg = document.createElement('div');
    var node = document.createTextNode(message);
    msg.classList.add('me');
    msg.appendChild(node);
    chat.appendChild(msg);
    
    // 서버로 message 이벤트 전달 + 데이터와 함께
    socket.emit('message', {type: 'message', message: message});
}