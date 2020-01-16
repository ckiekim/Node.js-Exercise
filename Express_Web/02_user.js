var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var template = require('./view2/template');
var alert = require('./view2/alertMsg');

var searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
var registerSql = `INSERT INTO user(uid, name, password, tel) VALUES(?, ?, ?, ?)`;
var listSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content, b.hit FROM bbs b join user u on b.userId=u.uid`;
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
        let view = require('./view/index');
        let html = view.index(navBar, trs);
        res.send(html);
    });
});

app.get('/register', function(req, res) {
    let navBar = template.navOp();
    let view = require('./view2/register');
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
    let view = require('./view2/login');
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