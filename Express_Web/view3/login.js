module.exports.register = function(navBar) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Express Web</title>
            <meta charset="utf-8">
            <style>
                table {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1><img src="login.png" height="60"> SQLite3로 만든 게시판 - 로그인</h1>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <form action="/user/login" method="post">
                <table>
                    <tr><td width="150">사용자 ID</td>
                        <td style="text-align: left;"><input type="text" size="20" name="uid"></td></tr>
                    <tr><td>비밀번호</td>
                        <td style="text-align: left;"><input type="password" size="20" name="password"></td></tr>
                    <tr><td colspan="2"><input type="submit" value="로그인"></td></tr>
                </table>
            </form>
        </body>
        </html>
    `;
}
