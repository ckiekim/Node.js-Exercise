module.exports.create = function(list, navBar) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>File Web</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">Web 프로그래밍 기술</a></h1>
            <h3>${list}</h3>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <h2>새 글 작성</h2>
            <form action="/create_proc" method="post">
                <p><input type="text" name="title" placeholder="제목"></p>
                <p><textarea name="description" rows="10" cols="80" placeholder="설명"></textarea></p>
                <p><input type="submit"></p>
            </form>
        </body>
        </html>   
    `;
}