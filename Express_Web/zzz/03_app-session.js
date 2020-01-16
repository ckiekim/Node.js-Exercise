const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const misc = require('./view/misc3');
const alert = require('./view/alertMsg');

const listSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs`;
const joinSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.hit FROM bbs b join user u on b.userId=u.uid`;
const searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
const incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
const insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
const updateSql = `UPDATE bbs SET title=?, timestamp=datetime('now'), content=? WHERE id=?`;
const deleteSql = `DELETE FROM bbs WHERE id=?`;
const searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
const registerSql = `INSERT INTO user(uid, name, password, tel) VALUES(?, ?, ?, ?)`;
const db = new sqlite3.Database("db/bbs.db");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/', function(req, res) {
    let navBar = misc.navMain(req.session.userName);
    let trs = '';
    db.all(joinSql, function(err, rows) {
        for(let row of rows) {
            trs += misc.tableMain(row);
        }
        let view = require('./view/index');
        let html = view.index(navBar, trs);
        res.send(html);
    });
});
app.get('/id/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = misc.navList(req.session.userName, idVal);
    db.serialize(function() {
        var stmt = db.prepare(incHitSql);
        stmt.run(idVal, idVal);
        stmt.finalize();
    
        stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, row) {
            let content = '';
            try {
                let _content = row.content;
                content = _content.replace(/\r\n/g, '<br>');
                console.log(content);
            } catch (error) {
                console.log(error);
            }
            console.log(row);
            try {
                let trs = misc.tableItem(row.id, row.title, row.userId, row.ts, row.hit, content);
                let view = require('./view/itemView');
                let html = view.itemView(navBar, trs);
                res.send(html);

            } catch (error) {
                console.log(error);
            }
        });
        stmt.finalize();
    });
});
/* app.get('/id/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = template.navList(idVal);
    db.serialize(function() {
        var stmt = db.prepare(incHitSql);
        stmt.run(idVal, idVal);
        stmt.finalize();
    
        stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, row) {
            let trs = template.tableItem(row);
            let view = require('./view/itemView');
            let html = view.itemView(navBar, trs);
            res.send(html);
        });
        stmt.finalize();
    });
}); */
app.get('/create', function(req, res) {
    let navBar = misc.navOp(req);
    let view = require('./view/create3');
    let html = view.create(navBar);
    res.send(html);
});
app.post('/create', function(req, res) {
    let title = req.body.title;
    let userId = req.session.userId;
    let content = req.body.content;
    let stmt = db.prepare(insertSql);
    stmt.run(title, userId, content);
    stmt.finalize();
    res.redirect('/');
});
app.get('/update/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = misc.navOp(req);

    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        let view = require('./view/update3');
        let html = view.update(navBar, row);
        res.send(html);
    });
    stmt.finalize();
});
app.post('/update', function(req, res) {
    let idVal = parseInt(req.body.id);
    let title = req.body.title;
    let content = req.body.content;

    let stmt = db.prepare(updateSql);
    stmt.run(title, content, idVal);
    stmt.finalize();
    res.redirect(`/id/${idVal}`);
});
app.get('/delete/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = misc.navOp(req);

    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        let view = require('./view/delete');
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
    let navBar = misc.navUser();
    let view = require('./view/register');
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
        if (row === undefined) {        // unique id
            if (password != password2) {
                console.log('비밀번호가 다릅니다.');
                let html = alert.alertMsg('비밀번호가 다릅니다.', '/');
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
    let navBar = misc.navUser();
    let view = require('./view/login');
    let html = view.login(navBar);
    res.send(html);
});
app.post('/login', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;
//const searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
    let stmt = db.prepare(searchUserSql);
    stmt.get(uid, function(err, row) {
        if (row === undefined) {        // unique id
            console.log('등록된 ID가 아닙니다.');
            let html = alert.alertMsg('등록된 ID가 아닙니다.', '/login');
            res.send(html);
        } else {
            bcrypt.compare(password, row.password, function(err, result) {
                if (result) {
                    req.session.userId = uid;
                    req.session.userName = row.name;
                    console.log(uid, row.name, "로그인 성공");
                    let html = alert.alertMsg(`${row.name} 님 환영합니다.`, '/');
                    res.send(html);
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
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');    
});
app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);