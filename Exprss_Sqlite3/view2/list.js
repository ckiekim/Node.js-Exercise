module.exports.list = function(navbar, list) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            ${navbar}
            <hr><br>
            <table>
                <tr><th width="50">ID</th>
                    <th width="200">제목</th>
                    <th width="100">글쓴이</th>
                    <th width="150">최종수정일시</th>
                    <th width="100">선택</th></tr>
                ${list}
            </table>
        </body>
        </html>
    `;
}