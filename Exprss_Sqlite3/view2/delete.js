module.exports.delete = function(navbar, id) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Delete - SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>SQLite로 만든 게시판</h1>
            ${navbar}
            <hr><br>
            <h3>글 삭제하기</h3><br>
            <form action="/delete_proc" method="post">
                <input type="hidden" name="id" value=${id}>
                <h4>id 값이 ${id}인 글을 삭제하시겠습니까?</h4>
                <input type="submit" value="삭제">
            </form>
        </body>
        </html>
    `;
}