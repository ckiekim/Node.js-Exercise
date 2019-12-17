var sqlite3 = require('sqlite3').verbose(); 
var listSql = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts FROM bbs";
var viewSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
var lastIDSql = "SELECT id FROM bbs ORDER BY id DESC LIMIT 1";
var insertSql = "INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
var updateSql = "UPDATE bbs SET title=?, timestamp=datetime('now'), content=? WHERE id=?";
var deleteSql = "DELETE FROM bbs WHERE id=?";

var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//app.locals.pretty = true;
//app.set('view engine', 'jade');
//app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
    if (req.query.id === undefined) {
        var db = new sqlite3.Database("db/bbs.db");
        db.all(listSql, function(err, rows) {
            if (err) {
                console.error('SQLite3 DB 오류', err);
                return;
            }
            var tr = '';
            rows.forEach(function (row) {
                tr += `<tr>
                <td>${row.id}</td>
                <td><a href="/?id=${row.id}">${row.title}</a></td>
                <td>${row.writer}</td>
                <td>${row.ts}</td>
                <td><a href="/update?id=${row.id}">수정</a>&nbsp;&nbsp;<a href="/delete?id=${row.id}">삭제</a></td>
                </tr>`;
                //console.log(row.id, row.title, row.writer, row.ts);
            });
            var view = require('./view/list');
            var html = view.list(tr);
            res.writeHead(200);
            res.end(html);
        });
        db.close();
    } else {    // 게시판 개별 글 상세조회
        console.log('게시판 개별 글 상세조회', req.query.id);
        var db = new sqlite3.Database("db/bbs.db");
        var idVal = parseInt(req.query.id);
        var stmt = db.prepare(viewSql);
        stmt.get(idVal, function(err, result) {
            if (err) {
                console.error('SQLite3 DB 오류', err);
                return;
            }
            stmt.finalize();
            var view = require('./view/eachview');
            var html = view.eachview(result.id, result.title, result.writer, result.ts, result.content);
            res.writeHead(200);
            res.end(html);
            //console.log(result.id, result.title, result.writer, result.ts, result.content);
        });
        db.close();
    }
});
app.get('/create', function(req, res) {
    var view = require('./view/create');
    var html = view.create();
    res.writeHead(200);
    res.end(html);
});
app.post('/create_proc', function(req, res) {   
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content.replace(/\r\n/g, '<br>');

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
            res.writeHead(302, {Location: '/'});
            res.end();
        });
    });         
    db.close();
});
app.get('/update', function(req, res) {
    var db = new sqlite3.Database("db/bbs.db");
    var idVal = parseInt(req.query.id);
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
        res.writeHead(200);
        res.end(html);
        //console.log(result.id, result.title, result.writer, result.ts, result.content);
    });
    db.close();
});
app.post('/update_proc', function(req, res) { 
    var idVal = parseInt(req.body.id);
    var title = req.body.title;
    var content = req.body.content.replace(/\r\n/g, '<br>');

    var db = new sqlite3.Database("db/bbs.db");
    var stmt = db.prepare(updateSql);
    stmt.run(title, content, idVal, function() {
        console.log('id =', idVal, '글이 수정되었습니다.');
        stmt.finalize();
        res.writeHead(302, {Location: '/'});
        res.end();
    });
    db.close();
});
app.get('/delete', function(req, res) {
    var view = require('./view/delete');
    var html = view.delete(req.query.id);
    res.writeHead(200);
    res.end(html);
});
app.post('/delete_proc', function(req, res) {
    var idVal = parseInt(req.body.id);

    var db = new sqlite3.Database("db/bbs.db");
    var stmt = db.prepare(deleteSql);
    stmt.run(idVal, function() {
        console.log('id =', idVal, '글이 삭제되었습니다.');
        stmt.finalize();
        res.writeHead(302, {Location: '/'});
        res.end();
    });
    db.close();
});
app.get('/register', function(req, res) {
    var view = require('./view/register');
    var html = view.register();
    res.writeHead(200);
    res.end(html);
});
app.post('/register_proc', function(req, res) {
    var userId = req.body.id;
    var userName = req.body.name;
    var password = req.body.password;
    var password2 = req.body.password2;
    var tel = req.body.tel;
    var email = req.body.email;
    //console.log('register', userId, userName, password, password2, tel, email);
    var sameUserSql = "SELECT id FROM user WHERE id=?";
    var registerSql = "INSERT INTO user VALUES(?, ?, ?, ?, ?)";
    var db = new sqlite3.Database("db/bbs.db");
    // 동일한 사용자 ID가 있는지 확인
    var stmt = db.prepare(sameUserSql);
    stmt.get(userId, function(err, result) {
        if (err) {
            console.error('사용자 조회 에러', err);
            return;          
        }
        if (result === undefined) {
            console.log('동일한 사용자 ID 없음');
            // 패스워드가 동일한지 확인
            if (password !== password2) {
                console.log('패스워드 불일치');
                res.writeHead(302, {Location: '/'});
                res.end();
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) {
                        console.error('bcrypt.genSalt() 에러:', err);
                        return;
                    } else {
                        bcrypt.hash(password, salt, null, function(err, hash) {
                            var stmt = db.prepare(registerSql);
                            stmt.run(userId, userName, hash, tel, email, function() {
                                console.log('사용자 등록 완료');
                                stmt.finalize();
                                res.writeHead(302, {Location: '/'});
                                res.end();
                            });
                        });
                    }
                });
            }
        } else {
            console.log('중복된 사용자 ID 있음');
            res.writeHead(302, {Location: '/'});
            res.end();
        }
        stmt.finalize();
    });
    db.close();
});
app.get('/login', function(req, res) {
    var view = require('./view/login');
    var html = view.login();
    res.writeHead(200);
    res.end(html);
});
app.post('/login_proc', function(req, res) {
    var userId = req.body.id;
    var password = req.body.password;
    console.log('login', userId, password);
    var getPasswordSql = "SELECT password FROM user WHERE id=?";
    var db = new sqlite3.Database("db/bbs.db");
    var stmt = db.prepare(getPasswordSql);
    stmt.get(userId, function(err, result) {
        if (err) {
            console.error('로그인 DB 에러', err);
            return;          
        }
        if (result === undefined) {
            console.log("없는 사용자 ID 에러");
            var view = require('./view/login');
            var html = view.login();
            res.writeHead(200);
            res.end(html);
        } else {
            bcrypt.compare(password, result.password, function(err, result) {
                if (err) {
                    console.error('bcrypt.compare() 에러', err);
                    return; 
                }
                if (result) {
                    console.log("로그인 성공");
                    res.writeHead(302, {Location: '/'});
                    res.end();
                } else {
                    console.log("패스워드 불일치");
                    var view = require('./view/login');
                    var html = view.login();
                    res.writeHead(200);
                    res.end(html);
                }
            });
        }
        stmt.finalize();
    });
    db.close();
});
app.listen(3000);