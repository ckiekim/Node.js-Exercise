module.exports.list = function(list) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>MongoDB로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>MongoDB로 만든 게시판</h1>
            <h4><a href='/create'>글 쓰기</a></h4>
            <hr><br>
            <table>
                <tr><th>ID</th><th>제목</th><th>글쓴이</th><th>최종수정일시</th><th>선택</th></tr>
                ${list}
            </table>
        </body>
        </html>
    `;
}