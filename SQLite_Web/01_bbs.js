var http = require('http');
var url = require('url');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();

var listSql = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts FROM bbs";
var viewSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        if (queryData.id === undefined) {   // 게시판 목록
            var db = new sqlite3.Database("db/bbs.db");
            db.all(listSql, function(err, rows) {
                if (err) {
                    console.error('SQLite3 DB 오류', err);
                    return;
                }
                var tr = '';
                rows.forEach(function (row) {
                    tr += `
                        <tr>
                        <td>${row.id}</td>
                        <td><a href="/?id=${row.id}">${row.title}</a></td>
                        <td>${row.writer}</td>
                        <td>${row.ts}</td>
                        <td><a href="/update?id=${row.id}">수정</a>&nbsp;&nbsp;<a href="/delete?id=${row.id}">삭제</a></td>
                        </tr>
                    `;
                    console.log(row.id, row.title, row.writer, row.ts);
                });
                var view = require('./view/list');
                var html = view.list(tr);
                response.writeHead(200);
                response.end(html);
            });
            db.close();
        } else {    // 게시판 개별 글 상세조회
            console.log(queryData.id);
            var db = new sqlite3.Database("db/bbs.db");
            var idVal = parseInt(queryData.id);
            var stmt = db.prepare(viewSql);
            stmt.get(idVal, function(err, result) {
                if (err) {
                    console.error('SQLite3 DB 오류', err);
                    return;
                }
                var view = require('./view/eachview');
                var html = view.eachview(result.id, result.title, result.writer, result.ts, result.content);
                response.writeHead(200);
                response.end(html);
                console.log(result.id, result.title, result.writer, result.ts, result.content);
            });
            stmt.finalize();
            db.close();
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);