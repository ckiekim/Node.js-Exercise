var http = require('http');
var url = require('url');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();

var listSql = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts FROM bbs";
var viewSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
var lastIDSql = "SELECT id FROM bbs ORDER BY id DESC LIMIT 1";
var insertSql = "INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
var updateSql = "UPDATE bbs SET title=?, timestamp=datetime('now'), content=? WHERE id=?";
var deleteSql = "DELETE FROM bbs WHERE id=?";

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
                    //console.log(row.id, row.title, row.writer, row.ts);
                });
                var view = require('./view/list');
                var html = view.list(tr);
                response.writeHead(200);
                response.end(html);
            });
            db.close();
        } else {    // 게시판 개별 글 상세조회
            console.log('게시판 개별 글 상세조회', queryData.id);
            var db = new sqlite3.Database("db/bbs.db");
            var idVal = parseInt(queryData.id);
            var stmt = db.prepare(viewSql);
            stmt.get(idVal, function(err, result) {
                if (err) {
                    console.error('SQLite3 DB 오류', err);
                    return;
                }
                stmt.finalize();
                var view = require('./view/eachview');
                var html = view.eachview(result.id, result.title, result.writer, result.ts, result.content);
                response.writeHead(200);
                response.end(html);
                console.log(result.id, result.title, result.writer, result.ts, result.content);
            });
            db.close();
        }
    } else if (pathname === '/create') {
        var view = require('./view/create');
        var html = view.create();
        response.writeHead(200);
        response.end(html);
    } else if (pathname === '/create_proc') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var writer = post.writer;
            var content = post.content.replace(/\r\n/g, '<br>');
            var db = new sqlite3.Database("db/bbs.db");
            var stmt = db.prepare(insertSql);
            db.serialize(function() {
                stmt.run(title, writer, content);
                stmt.finalize();
                db.get(lastIDSql, function(err, result) {
                    if (err) {
                        console.error('마지막 글 ID 조회 에러', err);
                        return;
                    }
                    console.log('id =', result.id, '글이 생성되었습니다.');
                });
            });
/*             stmt.run(title, writer, content, function() {
                stmt.finalize();
                db.get(lastIDSql, function(err, result) {
                    if (err) {
                        console.error('마지막 글 ID 조회 에러', err);
                        return;
                    }
                    console.log('id =', result.id, '글이 생성되었습니다.');
                });
            });  */              
            db.close();
            response.writeHead(302, {Location: '/'});
            response.end();
        });
    } else if (pathname === '/update') {
        //console.log('update', queryData.id);
        var db = new sqlite3.Database("db/bbs.db");
        var idVal = parseInt(queryData.id);
        var stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, result) {
            if (err) {
                console.error('게시판 개별 글 조회 에러', err);
                return;
            }
            stmt.finalize();
            var view = require('./view/update');
            var content = result.content.replace(/<br>/g, '\r\n');
            var html = view.update(result.id, result.title, result.writer, result.ts, content);
            response.writeHead(200);
            response.end(html);
            //console.log(result.id, result.title, result.writer, result.ts, result.content);
        });
        db.close();
    } else if (pathname === '/update_proc') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var idVal = parseInt(post.id);
            var title = post.title;
            var content = post.content.replace(/\r\n/g, '<br>');

            var db = new sqlite3.Database("db/bbs.db");
            var stmt = db.prepare(updateSql);
            stmt.run(title, content, idVal, function() {
                console.log('id =', idVal, '글이 수정되었습니다.');
                stmt.finalize();
            });
            db.close();
            response.writeHead(302, {Location: '/'});
            response.end();
        });
    } else if (pathname === '/delete') {
        //console.log('delete', queryData.id);
        var view = require('./view/delete');
        var html = view.delete(queryData.id);
        response.writeHead(200);
        response.end(html);
    } else if (pathname === '/delete_proc') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var idVal = parseInt(post.id);

            var db = new sqlite3.Database("db/bbs.db");
            var stmt = db.prepare(deleteSql);
            stmt.run(idVal, function() {
                console.log('id =', idVal, '글이 삭제되었습니다.');
                stmt.finalize();
            });
            db.close();
            response.writeHead(302, {Location: '/'});
            response.end();
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);