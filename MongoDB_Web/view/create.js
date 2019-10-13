module.exports.create = function() {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Create - MongoDB로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>MongoDB로 만든 게시판</h1>
            <h4><a href="/">홈으로</a></h4>
            <hr><br>
            <h3>글 쓰기</h3><br>
            <form action="/create_proc" method="post">
                <table>
                    <tr><th>항목</th><th>내용</th></tr>
                    <tr><td>ID</td><td><input type="text" name="id"></td></tr>
                    <tr><td>제목</td><td><input type="text" name="title"></td></tr>
                    <tr><td>글쓴이</td><td><input type="text" name="writer"></td></tr>
                    <tr><td>내용</td><td><textarea rows="10" cols="80" name="content"></textarea></td></tr>
                </table>
                <input type="submit" value="확인">
            </form>
        </body>
        </html>
    `;
}