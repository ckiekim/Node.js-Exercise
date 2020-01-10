module.exports.register = function() {
    return `
        <!doctype html>
        <html>
        <head>
            <title>사용자 등록 - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            <h4><a href="/">홈으로</a></h4>
            <hr><br>
            <h3>사용자 등록</h3><br>
            <form action="/register" method="post">
                <table>
                    <tr><th>항목</th><th>내용</th></tr>
                    <tr><td>Login ID</td><td><input type="text" name="id"></td></tr>
                    <tr><td>사용자 이름</td><td><input type="text" name="name"></td></tr>
                    <tr><td>Password</td><td><input type="password" name="password"></td></tr>
                    <tr><td>Password 확인</td><td><input type="password" name="password2"></td></tr>
                    <tr><td>전화 번호</td><td><input type="text" name="tel"></td></tr>
                    <tr><td>eMail</td><td><input type="text" name="email"></td></tr>
                </table>
                <input type="submit" value="확인">
            </form>
        </body>
        </html>
    `;
}