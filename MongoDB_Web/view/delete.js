module.exports.delete = function(id) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Delete - MongoDB로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                /* var input = confirm('id 값이 ${id}인 글을 삭제하시겠습니까?');
                if (input) {
                    document.location.href = "/delete_proc?id=${id}";
                } else {
                    document.location.href = "/";
                } */
            </script>
            <h1>MongoDB로 만든 게시판</h1>
            <h4><a href="/">홈으로</a></h4>
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