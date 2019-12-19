module.exports.navbar = function(session) {
    if (session.userId !== undefined) {
        return `
            <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
            <a href='/logout'>로그아웃</a>&nbsp;&nbsp;&nbsp;
            ${session.userName} 님 환영합니다.</h4>
        `;
    } else {
        return `
            <h4><a href="/">홈으로</a>&nbsp;&nbsp;&nbsp;
            <a href='/login'>로그인</a>&nbsp;&nbsp;&nbsp;
            <a href='/register'>사용자 등록</a></h4>        
        `;
    }
}