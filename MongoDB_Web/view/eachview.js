module.exports.eachview = function(id, title, writer, time, content) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>MongoDB로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>MongoDB로 만든 게시판</h1>
            <h4><a href="/update?id=${id}">수정</a>&nbsp;&nbsp;<a href="/">홈으로</a></h4>
            <hr><br>
            <table>
                <tr><th>항목</th><th>내용</th></tr>
                <tr><td>ID</td><td>${id}</td></tr>
                <tr><td>제목</td><td>${title}</td></tr>
                <tr><td>글쓴이</td><td>${writer}</td></tr>
                <tr><td>일시</td><td>${time}</td></tr>
                <tr><td>내용</td><td>${content}</td></tr>
            </table>
        </body>
        </html>
    `;
}