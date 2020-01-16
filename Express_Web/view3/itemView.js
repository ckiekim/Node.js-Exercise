module.exports.itemView = function(navBar, trs) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Express Web</title>
        <meta charset="utf-8">
        <style>
            table {
                text-align: left;
            }
        </style>
    </head>
    <body>
        <h1>SQLite3로 만든 게시판</h1>
        <hr>
        <h4>${navBar}</h4>
        <hr>
        <table>
            <thead>
                <tr>
                    <th width="150">항목</th>
                    <th width="300">값</th>
                </tr>
            </thead>
            <tbody>
                ${trs}
            </tbody>
        </table>
    </body>
    </html>    
    `;
}