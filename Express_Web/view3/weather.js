module.exports.weather = function(navBar, table) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>SQLite로 만든 게시판</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><img src="weather.jpg" height="60"> SQLite로 만든 게시판</h1>
            ${navBar}
            <hr><br>
            ${table}
        </body>
        </html>
    `;
}