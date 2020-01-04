var http = require('http');
var url = require('url');

var htmlStatic = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Static Web</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Web 프로그래밍 기술</h1>
        <h3><ul>
            <li><a href="/?title=HTML5">HTML5</a></li>
            <li><a href="/?title=CSS3">CSS3</a></li>
            <li><a href="/?title=Javascript">Javascript</a></li>
        </ul></h3>
        <hr>
        <p>웹(World Wide Web)의 개방성은 웹사이트나 온라인 애플리케이션을 제작하려는 사람들에게 많은 기회를 
        제공합니다. 하지만 그 사용 방법을 알아야 웹 기술을 잘 활용할 수 있습니다. 아래의 링크들을 확인하여 
        다양한 웹 기술을 배워보세요.</p>
    </body>
    </html>
`;
function htmlString(title, description) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Static Web</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Web 프로그래밍 기술</h1>
            <h3><ul>
                <li><a href="/?title=HTML5">HTML5</a></li>
                <li><a href="/?title=CSS3">CSS3</a></li>
                <li><a href="/?title=Javascript">Javascript</a></li>
            </ul></h3>
            <hr>
            <h2>${title}</h2>
            <p>${description}</p>
        </body>
        </html>
    `;
}
var contents = [
    {title: "HTML5", data: "웹을 이루는 가장 기초적인 구성 요소입니다. HTML은 웹 페이지의 내용을 서술하고 정의하는 데 사용합니다."},
    {title: "CSS3", data: "HTML이나 XML(SVG, XHTML 같은 XML 방언(dialect) 포함)로 작성된 문서의 표현을 기술하기 위해 쓰이는 스타일시트 언어입니다."},
    {title: "Javascript", data: "브라우저에서 실행되는 프로그램 언어입니다. 사용자의 행동에 화면이 반응하는 것과 같은 동적인 기능을 웹페이지나 애플리케이션에 넣기 위해 사용합니다."}
];

var app = http.createServer(function(req, res) {
    let _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    console.log(queryData.title);
    if (pathname === '/') {
        if (queryData.title === undefined) {
            res.writeHead(200);
            res.end(htmlStatic);
        } else {
            let title = queryData.title;
            let description = '';
            for (var content of contents) {
                if (title === content.title) {
                    description = content.data;
                }
            }
            let template = htmlString(title, description);
            res.writeHead(200);
            res.end(template);
        }
    } else if (pathname === '/favicon.ico') {

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);