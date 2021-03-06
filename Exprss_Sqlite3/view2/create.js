module.exports.create = function(navbar) {
    return ` 
        <!doctype html>
        <html>
        <head>
            <title>Create - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            ${navbar}
            <hr><br>
            <h3>글 쓰기</h3><br>
            <form action="/create" method="post">
                <table>
                    <tr><th>항목</th><th>내용</th></tr>
                    <tr><td>제목</td><td><input type="text" name="title"></td></tr>
                    <tr><td>내용</td><td><textarea rows="10" cols="80" name="content"></textarea></td></tr>
                </table>
                <input type="submit" value="확인">
            </form>
        </body>
        </html>
    `;
}