module.exports.login = function() {
    return `
        <!doctype html>
        <html>
        <head>
            <title>로그인 - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            <h4><a href='/'>홈으로</a>&nbsp;&nbsp;&nbsp;
                <a href='/register'>사용자 등록</a></h4>
            <hr><br>
            <h3>로그인</h3><br>
            <form action="/login_proc" method="post">
                <table>
                    <tr><th>항목</th><th>내용</th></tr>
                    <tr><td>Login ID</td><td><input type="text" name="id"></td></tr>
                    <tr><td>Password</td><td><input type="password" name="password"></td></tr>
                </table>
                <input type="submit" value="확인">
            </form>
        </body>
        </html>
    `;
}