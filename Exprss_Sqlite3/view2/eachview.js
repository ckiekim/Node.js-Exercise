module.exports.eachview = function(navbar, id, title, writer, timestamp, content) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>View - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            ${navbar}
            <hr><br>
            <h3>글 보기</h3><br>
            <table>
                <tr><th>항목</th><th>내용</th></tr>
                <tr><td>ID</td><td>${id}</td></tr>
                <tr><td>제목</td><td>${title}</td></tr>
                <tr><td>글쓴이</td><td>${writer}</td></tr>
                <tr><td>일시</td><td>${timestamp}</td></tr>
                <tr><td>내용</td><td>${content}</td></tr>
            </table>
        </body>
        </html>
    `;
}