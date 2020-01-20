const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt-nodejs');
const template = require('./view3/template');
const alert = require('./view3/alertMsg');

const router = express.Router();

var searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
var registerSql = `INSERT INTO user(uid, name, password, tel) VALUES(?, ?, ?, ?)`;
var db = new sqlite3.Database("db/bbs.db");
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res) {
    let navBar = template.navUser();
    let view = require('./view3/register');
    let html = view.register(navBar);
    res.send(html);
});
router.post('/register', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let password = req.body.password;
    let password2 = req.body.password2;
    let tel = req.body.tel;

    let stmt = db.prepare(searchUserSql);
    stmt.get(uid, function(err, row) {
        if (row === undefined) {        // unique uid
            if (password.length < 4) {
                let html = alert.alertMsg('비밀번호를 4글자 이상 입력하세요.', '/user/register');
                res.send(html);
            } else if (password != password2) {
                console.log('비밀번호가 다릅니다.');
                let html = alert.alertMsg('비밀번호가 다릅니다.', '/user/register');
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
router.get('/login', function(req, res) {
    let navBar = template.navUser();
    let view = require('./view3/login');
    let html = view.register(navBar);
    res.send(html);
});
router.post('/login', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;

    let stmt = db.prepare(searchUserSql);
    stmt.get(uid, function(err, row) {
        if (row === undefined) {        // unique uid
            console.log('등록된 ID가 아닙니다.');
            let html = alert.alertMsg('등록된 ID가 아닙니다.', '/user/login');
            res.send(html);
        } else {
            bcrypt.compare(password, row.password, function(err, result) {
                if (result) {
                    req.session.userId = uid;
                    req.session.userName = row.name;
                    console.log(`${uid}, ${row.name} 로그인 성공`);
                    let html = alert.alertMsg(`${row.name} 님 환영합니다.`, '/');
                    res.send(html);
                } else {
                    console.log("패스워드 불일치");
                    let html = alert.alertMsg('패스워드가 틀립니다.', '/user/login');
                    res.send(html);
                }
            });            
        }
    });
    stmt.finalize();
});
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');    
});
module.exports = router;
