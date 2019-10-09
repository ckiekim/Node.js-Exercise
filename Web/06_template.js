module.exports = {
    HTML: function(title, list, body, control) {
        return `
            <!doctype html>
            <html>
            <head>
                <title>${title} to WEB2</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB2</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
            </html>
        `;
    },
    List: function(filelist) {
        var list = '<ul>';
        for (var i=0; i<filelist.length; i++) {
            var file = filelist[i].substring(0, filelist[i].length-4);
            list += `<li><a href="/?id=${file}">${file}</a></li>`
        }
        list += '</ul>'; 
        return list;
    }
}