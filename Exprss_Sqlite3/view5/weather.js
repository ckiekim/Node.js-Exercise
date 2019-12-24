module.exports.weather = function(navbar, table) {
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
            ${table}
        </body>
        </html>
    `;
}