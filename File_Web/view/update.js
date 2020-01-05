module.exports.update = function(list, navBar, title, description) {
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
            <h2>글 수정하기</h2>
            <form action="/update_proc" method="post">
                <input type="hidden" name="old_title" value="${title}">
                <p><input type="text" name="title" value="${title}"></p>
                <p><textarea name="description" rows="10" cols="80">${description}</textarea></p>
                <p><input type="submit" value="수정"></p>
            </form>
        </body>
        </html>  
    `;
}