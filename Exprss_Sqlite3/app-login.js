/*
 *  Sample BBS Web
 *    - Express 사용
 *    - 사용 모듈: sqlite3, express, body-parser, bcrypt-nodejs
 *    - 게시판 기능: 목록, 생성, 조회, 수정, 삭제, 로그인/로그아웃, 사용자 등록
 */
var sqlite3 = require('sqlite3').verbose(); 
var listSql = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts FROM bbs";
var joinSql = "SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content FROM bbs b JOIN user u ON b.writer=u.id";
var lastIDSql = "SELECT id FROM bbs ORDER BY id DESC LIMIT 1";
var insertSql = "INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
var updateSql = "UPDATE bbs SET title=?, timestamp=datetime('now'), content=? WHERE id=?";
var deleteSql = "DELETE FROM bbs WHERE id=?";
var db = new sqlite3.Database("db/bbs.db");

var bcrypt = require('bcrypt-nodejs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var alert = require('./view/alertMsg');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(req, res) {
    db.all(joinSql, function(err, rows) {
        var tr = '';
        var misc = require('./view/misc');
        for (let row of rows) {
            tr += misc.tableRows(row);
            //console.log(row);
        }
        var view = require('./view/list');
        var html = view.list(tr);
        res.send(html);
    });
});
app.get('/id/:id', function(req, res) {     // 게시판 개별 글 상세조회
    var idVal = parseInt(req.params.id);
    var stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, result) {
        var view = require('./view/eachview');
        var content = result.content.replace(/\r\n/g, '<br>');
        var html = view.eachview(result.id, result.title, result.writer, result.ts, content);
        res.send(html);
        //console.log(result.id, result.title, result.writer, result.ts, result.content);
    });
    stmt.finalize();
});
app.get('/create', function(req, res) {
    var view = require('./view/create');
    var html = view.create();
    res.send(html);
});
app.post('/create', function(req, res) {   
    var title = req.body.title;
    var writer = req.body.writer;
    var content = req.body.content;

    db.serialize(function() {
        var stmt = db.prepare(insertSql);
        stmt.run(title, writer, content);
        stmt.finalize();
        db.get(lastIDSql, function(err, result) {
            console.log('id =', result.id, '글이 생성되었습니다.');
            res.redirect('/');
        });
    });         
});
app.get('/update/:id', function(req, res) {
    var idVal = parseInt(req.params.id);
    var stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, result) {
        if (err) {
            console.error('게시판 개별 글 조회 에러', err);
            return;
        }
        var view = require('./view/update');
        var html = view.update(result.id, result.title, result.writer, result.ts, result.content);
        res.send(html);
        //console.log(result.id, result.title, result.writer, result.ts, result.content);
    });
    stmt.finalize();
});
app.post('/update', function(req, res) { 
    var idVal = parseInt(req.body.id);
    var title = req.body.title;
    var content = req.body.content;

    var stmt = db.prepare(updateSql);
    stmt.run(title, content, idVal, function() {
        console.log('id =', idVal, '글이 수정되었습니다.');
        res.redirect('/');
    });
    stmt.finalize();
});
app.get('/delete/:id', function(req, res) {
    var view = require('./view/delete');
    var html = view.delete(req.params.id);
    res.send(html);
});
app.post('/delete', function(req, res) {
    var idVal = parseInt(req.body.id);

    var stmt = db.prepare(deleteSql);
    stmt.run(idVal, function() {
        console.log('id =', idVal, '글이 삭제되었습니다.');
        res.redirect('/');
    });
    stmt.finalize();
});
app.get('/register', function(req, res) {
    var view = require('./view/register');
    var html = view.register();
    res.send(html);
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

    // 동일한 사용자 ID가 있는지 확인
    var stmt = db.prepare(sameUserSql);
    stmt.get(userId, function(err, result) {
        if (result === undefined) {     // 고유한 사용자 ID
            if (password !== password2) {   // 패스워드가 동일한지 확인
                console.log('패스워드 불일치');
                let html = alert.alertMsg('패스워드 불일치', '/register');
                res.send(html);
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, null, function(err, hash) {
                        var stmt2 = db.prepare(registerSql);
                        stmt2.run(userId, userName, hash, tel, email, function() {
                            //console.log('사용자 등록 완료');
                            res.redirect('/');
                        });
                        stmt2.finalize();
                    });
                });
            }
        } else {    // 중복된 사용자 ID
            let html = alert.alertMsg('중복된 사용자 ID', '/register');
            res.send(html);
        }
    });
    stmt.finalize();
});
app.get('/login', function(req, res) {
    var view = require('./view/login');
    var html = view.login();
    res.send(html);
});
app.post('/login', function(req, res) {
    var userId = req.body.id;
    var password = req.body.password;

    var getPasswordSql = "SELECT password FROM user WHERE id=?";
    var stmt = db.prepare(getPasswordSql);
    stmt.get(userId, function(err, result) {
        if (result === undefined) {
            let html = alert.alertMsg('사용자 ID 없음', '/login');
            res.send(html);
        } else {
            bcrypt.compare(password, result.password, function(err, result) {
                if (result) {
                    console.log("로그인 성공");
                    res.redirect('/');
                } else {
                    let html = alert.alertMsg('패스워드 불일치', '/login');
                    res.send(html);
                }
            });
        }
    });
    stmt.finalize();
});
app.use(function(req, res, next) {
    res.status(404).send('404 Error: Page not found');
});
app.listen(3000);