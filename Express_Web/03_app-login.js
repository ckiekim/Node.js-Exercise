const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const template = require('./view3/template');
const alert = require('./view3/alertMsg');

var listSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content, b.hit FROM bbs b join user u on b.userId=u.uid`;
var searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
var incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
var insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
var updateSql = `UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
var deleteSql = `DELETE FROM bbs WHERE id=?`;
var db = new sqlite3.Database("db/bbs.db");

const app = express();
const userRouter = require('./userRouter');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})     // [session-file-store] will retry, error on last attempt: Error: ENOENT 출력 방지
}));
app.use('/user', userRouter);

app.get('/', function(req, res) {
    let navBar = template.navMain(req.session.userName);
    let trs = '';
    db.all(listSql, function(err, rows) {
        for(let row of rows) {
            trs += template.tableMain(row);
        }
        let view = require('./view3/index');
        let html = view.index(navBar, trs);
        res.send(html);
    });
});
app.get('/id/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let navBar = template.navList(req.session.userName, idVal);
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
    let navBar = template.navOp(req.session.userName);
    let view = require('./view3/create');
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
    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        if (row.userId === req.session.userId) {
            let navBar = template.navOp(req.session.userName);
            let view = require('./view3/update');
            let html = view.update(navBar, row);
            res.send(html);
        } else {
            let html = alert.alertMsg('수정 권한이 없습니다.', `/id/${idVal}`);
            res.send(html);
        }
    });
    stmt.finalize();
});
app.post('/update', function(req, res) {
    let idVal = parseInt(req.body.id);
    let title = req.body.title;
    let userId = req.session.userId;
    let content = req.body.content;

    let stmt = db.prepare(updateSql);
    stmt.run(title, userId, content, idVal);
    stmt.finalize();
    res.redirect(`/id/${idVal}`);
});
app.get('/delete/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    let stmt = db.prepare(searchSql);
    stmt.get(idVal, function(err, row) {
        if (row.userId === req.session.userId) {
            let navBar = template.navOp(req.session.userName);
            let view = require('./view3/delete');
            let html = view.delete(navBar, row);
            res.send(html);
        } else {
            let html = alert.alertMsg('삭제 권한이 없습니다.', `/id/${idVal}`);
            res.send(html);
        }
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
/* app.get('/delete/delete.jpg', function(req, res) {
    console.log('delete.jpg');
    const fs = require('fs');
    fs.readFile(`./public/delete.jpg`, function(err, data) {
        res.type('image/jpg');
        res.send(data);
    });
}); */

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});

app.listen(3000);