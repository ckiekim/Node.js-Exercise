var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var template = require('./view3/template');
var alert = require('./view3/alertMsg');

var listSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content, b.hit FROM bbs b join user u on b.userId=u.uid`;
var searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
var incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
var insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
var updateSql = `UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
var deleteSql = `DELETE FROM bbs WHERE id=?`;
var searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
var registerSql = `INSERT INTO user(uid, name, password, tel) VALUES(?, ?, ?, ?)`;
var db = new sqlite3.Database("db/bbs.db");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/', function(req, res) {
    let navBar = template.navMain();
    let trs = '';
    db.all(listSql, function(err, rows) {
        for(let row of rows) {
            trs += template.tableMain(row);
            //console.log(row);
        }
        let view = require('./view3/index');
        let html = view.index(navBar, trs);
        res.send(html);
    });
});
app.get('/id/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = template.navList(idVal);
    db.serialize(function() {
        var stmt = db.prepare(incHitSql);
        stmt.run(idVal, idVal);
        stmt.finalize();
    
        stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, row) {
            let trs = template.tableItem(row);
            let view = require('./view3/itemView');
            let html = view.itemView(navBar, trs);
            res.send(html);
        });
        stmt.finalize();
    });
});
app.get('/create', function(req, res) {
    let navBar = template.navOp();
    let view = require('./view3/create');
    let html = view.create(navBar);
    res.send(html);
});
app.post('/create', function(req, res) {
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let stmt = db.prepare(insertSql);
    stmt.run(title, userId, content);
    stmt.finalize();
    res.redirect('/');
});
app.get('/update/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = template.navOp();

    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        let view = require('./view3/update');
        let html = view.update(navBar, row);
        res.send(html);
    });
    stmt.finalize();
});
app.post('/update', function(req, res) {
    let idVal = parseInt(req.body.id);
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;

    let stmt = db.prepare(updateSql);
    stmt.run(title, userId, content, idVal);
    stmt.finalize();
    res.redirect(`/id/${idVal}`);
});
app.get('/delete/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = template.navOp();

    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        let view = require('./view3/delete');
        let html = view.delete(navBar, row);
        res.send(html);
    });
    stmt.finalize();
});
app.post('/delete', function(req, res) {
    let idVal = parseInt(req.body.id);
    
    let stmt = db.prepare(deleteSql);
    stmt.run(idVal);
    stmt.finalize();
    res.redirect('/');
});
app.get('/register', function(req, res) {
    let navBar = template.navOp();
    let view = require('./view3/register');
    let html = view.register(navBar);
    res.send(html);
});
app.post('/register', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let password = req.body.password;
    let password2 = req.body.password2;
    let tel = req.body.tel;

    let stmt = db.prepare(searchUserSql);
    stmt.get(uid, function(err, row) {
        if (row === undefined) {        // unique uid
            if (password.length < 4) {
                let html = alert.alertMsg('비밀번호를 4글자 이상 입력하세요.', '/register');
                res.send(html);
            } else if (password != password2) {
                console.log('비밀번호가 다릅니다.');
                let html = alert.alertMsg('비밀번호가 다릅니다.', '/register');
                res.send(html);               
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, null, function(err, hash) {
                        let stmt2 = db.prepare(registerSql);
                        stmt2.run(uid, name, hash, tel, function() {
                            console.log('사용자 등록 완료');
                            res.redirect('/');
                        });
                        stmt2.finalize();
                    });
                });
            }
        } else {
            console.log('중복된 ID 입니다.');
            let html = alert.alertMsg('중복된 ID 입니다.', '/');
            res.send(html);
        }
    });
    stmt.finalize();
});
app.get('/login', function(req, res) {
    let navBar = template.navOp();
    let view = require('./view3/login');
    let html = view.register(navBar);
    res.send(html);
});
app.post('/login', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;

    let stmt = db.prepare(searchUserSql);
    stmt.get(uid, function(err, row) {
        if (row === undefined) {        // unique uid
            console.log('등록된 ID가 아닙니다.');
            let html = alert.alertMsg('등록된 ID가 아닙니다.', '/login');
            res.send(html);
        } else {
            bcrypt.compare(password, row.password, function(err, result) {
                if (result) {
                    console.log("로그인 성공");
                    res.redirect('/');
                } else {
                    console.log("패스워드 불일치");
                    let html = alert.alertMsg('패스워드가 틀립니다.', '/login');
                    res.send(html);
                }
            });            
        }
    });
    stmt.finalize();
});
app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);