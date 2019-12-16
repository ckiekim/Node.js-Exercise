module.exports.update = function(id, title, writer, ts, content) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Update - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            <h4><a href="/">홈으로</a></h4>
            <hr><br>
            <h3>글 수정하기</h3><br>
            <form action="/update_proc" method="post">
                <input type="hidden" name="id" value=${id}>
                <table>
                    <tr><th>항목</th><th>내용</th></tr>
                    <tr><td>ID</td><td>${id}</td></tr>
                    <tr><td>제목</td><td><input type="text" name="title" value=${title}></td></tr>
                    <tr><td>글쓴이</td><td>${writer}</td></tr>
                    <tr><td>최종 수정시간</td><td>${ts}</td></tr>
                    <tr><td>내용</td><td><textarea rows="10" cols="80" name="content">${content}</textarea></td></tr>
                </table>
                <input type="submit" value="수정">
            </form>
        </body>
        </html>
    `;
}