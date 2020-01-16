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
            <h1><img src="hello.png" height="40"> SQLite3로 만든 게시판 - 사용자 관리</h1>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <form action="/register" method="post">
                <table>
                    <tr><td width="150">사용자 ID</td>
                        <td style="text-align: left;"><input type="text" size="40" name="uid"></td></tr>
                    <tr><td width="150">사용자 이름</td>
                        <td style="text-align: left;"><input type="text" size="40" name="name"></td></tr>
                    <tr><td>비밀번호</td>
                        <td style="text-align: left;"><input type="password" size="40" name="password"></td></tr>
                    <tr><td>비밀번호 확인</td>
                        <td style="text-align: left;"><input type="password" size="40" name="password2"></td></tr>                    
                    <tr><td width="150">전화번호</td>
                        <td style="text-align: left;"><input type="text" size="40" name="tel"></td></tr>
                    <tr><td colspan="2"><input type="submit" value="가입"></td></tr>
                </table>
            </form>
        </body>
        </html>
    `;
}