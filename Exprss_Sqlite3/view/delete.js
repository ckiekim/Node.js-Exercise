module.exports.delete = function(id) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Delete - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            <h4><a href="/">홈으로</a></h4>
            <hr><br>
            <h3>글 삭제하기</h3><br>
            <form action="/delete" method="post">
                <input type="hidden" name="id" value=${id}>
                <h4>id 값이 ${id}인 글을 삭제하시겠습니까?</h4>
                <input type="submit" value="삭제">
            </form>
        </body>
        </html>
    `;
}