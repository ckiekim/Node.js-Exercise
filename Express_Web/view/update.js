module.exports.update = function(navBar, row) {
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
            <h1>SQLite3로 만든 게시판</h1>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <form action="/update" method="post">
                <table>
                    <input type="hidden" name="id" value="${row.id}">
                    <tr><td width="180">ID</td><td>${row.id}</td></tr>
                    <tr><td>제목</td>
                        <td style="text-align: left;"><input type="text" size="40" name="title" value="${row.title}"></td></tr>
                    <tr><td>글쓴이</td>
                        <td style="text-align: left;"><input type="text" size="40" name="userId" value="${row.userId}"></td></tr>
                    <tr><td>최종 수정시간</td><td>${row.ts}</td></tr> 
                    <tr><td>조회수</td><td>${row.hit}</td></tr>                    
                    <tr><td>내용</td>
                        <td style="text-align: left;"><textarea name="content" rows="5" cols="60">${row.content}</textarea></td></tr>
                    <tr><td colspan="2"><input type="submit" value="수정"></td></tr>
                </table>
            </form>

        </body>
        </html>    
    `;
}