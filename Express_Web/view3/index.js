module.exports.index = function(navBar, trs) {
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
            <h1><img src="welcome.jpg" height="60"> SQLite3로 만든 게시판</h1>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th width="50">ID</th>
                        <th width="300">제목</th>
                        <th width="80">글쓴이</th>
                        <th width="200">최종수정시간</th>
                        <th width="80">조회수</th>
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
