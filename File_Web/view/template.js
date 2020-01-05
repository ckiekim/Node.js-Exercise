module.exports = {
    Main: function(list, navBar, title, description) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>File Web-module</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">Web 프로그래밍 기술</a></h1>
                <h3>${list}</h3>
                <hr>
                <h4>${navBar}</h4>
                <hr>
                <h2>${title}</h2>
                <p>${description}</p>
            </body>
            </html>
        `;
    },
    List: function(filelist) {
        var list = '<ul>';
        for (let file of filelist) {
            let _file = file.substring(0, file.length-4);
            list += `<li><a href="/?title=${_file}">${_file}</a></li>`; 
        }
        list += '</ul>';
        return list;
    },
    NavMain: function() {
        return `
            <a href="/">홈으로</a>&nbsp;&nbsp;
            <a href="/create">글쓰기</a>
        `;
    },
    NavList: function(title) {
        return `
            <a href="/">홈으로</a>&nbsp;&nbsp;
            <a href="/update?title=${title}">수정하기</a>&nbsp;&nbsp;
            <a href="/delete?title=${title}">삭제하기</a>
        `;
    },
    NavOp: function() {
        return '<a href="/">홈으로</a>';
    }
}