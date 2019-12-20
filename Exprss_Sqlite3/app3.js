/*
 *  MVC BBS Web
 *    - 사용 모듈: sqlite3, express, body-parser, express-session, session-file-store, bcrypt-nodejs
 *    - 게시판 기능: 목록, 생성, 조회, 수정, 삭제, 로그인/로그아웃, 사용자 등록
 */
var dbModule = require('./db-module');

var bcrypt = require('bcrypt-nodejs');
var express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var miscView = require('./view2/misc');
var app = express();
var bodyParser = require('body-parser');        // POST 처리
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/', function(req, res) {
    var navbar = '';
    if (req.query.id === undefined) {
        navbar = miscView.homeNav(req.session);
        //console.log('Session:', req.session);
        var tr = '';
        dbModule.listItems(function(rows) {
            rows.forEach(function (row) {
                tr += miscView.tableRow(row.id, row.title, row.writer, row.ts);
                //console.log(row.id, row.title, row.writer, row.ts);
            });
            var view = require('./view2/list');
            var html = view.list(navbar, tr);
            res.writeHead(200);
            res.end(html);
        });
    } else {    // 게시판 개별 글 상세조회
        var navbar = miscView.navBar(req.session);
        //console.log('게시판 개별 글 상세조회', req.query.id);
        dbModule.viewItem(parseInt(req.query.id), function(result) {
            var view = require('./view2/eachview');
            var html = view.eachview(navbar, result.id, result.title, result.writer, result.ts, result.content);
            res.writeHead(200);
            res.end(html);
            //console.log(result.id, result.title, result.writer, result.ts, result.content);
        });
    }
});
app.get('/create', function(req, res) {
    var navbar = miscView.navBar(req.session);
    var view = require('./view2/create');
    var html = view.create(navbar);
    res.writeHead(200);
    res.end(html);
});
app.post('/create_proc', function(req, res) {   
    var title = req.body.title;
    var writer = req.session.userId;
    var content = req.body.content.replace(/\r\n/g, '<br>');

    dbModule.insertItem(title, writer, content, function(result) {
        console.log('id =', result, '글이 생성되었습니다.');
        res.writeHead(302, {Location: '/'});
        res.end();
    });         
});
app.get('/update', function(req, res) {
    dbModule.viewItem(parseInt(req.query.id), function(result) {
        if (result.writer === req.session.userId) {  
            var navbar = miscView.navBar(req.session);
            var view = require('./view2/update');
            var content = result.content.replace(/<br>/g, '\r\n');
            var html = view.update(navbar, result.id, result.title, result.writer, result.ts, content);
            res.writeHead(200);
            res.end(html);
            //console.log(result.id, result.title, result.writer, result.ts, result.content);         
        } else {
            var view = require('./view2/alertMsg');
            var message = '수정 권한이 없습니다.';
            var url = '/';
            var html = view.alertMsg(message, url);
            res.writeHead(200);
            res.end(html);            
        }
    });
});
app.post('/update_proc', function(req, res) { 
    var idVal = parseInt(req.body.id);
    var title = req.body.title;
    var content = req.body.content.replace(/\r\n/g, '<br>');

    dbModule.updateItem(idVal, title, content, function() {
        console.log('id =', idVal, '글이 수정되었습니다.');
        res.writeHead(302, {Location: '/'});
        res.end();
    });
});
app.get('/delete', function(req, res) {
    dbModule.viewItem(parseInt(req.query.id), function(result) {
        if (result.writer === req.session.userId) {
            var navbar = miscView.navBar(req.session);   
            var view = require('./view2/delete');
            var html = view.delete(navbar, req.query.id);
            res.writeHead(200);
            res.end(html);
            //console.log(result.id, result.title, result.writer, result.ts, result.content);         
        } else {
            var view = require('./view2/alertMsg');
            var message = '삭제 권한이 없습니다.';
            var url = '/';
            var html = view.alertMsg(message, url);
            res.writeHead(200);
            res.end(html);            
        }
    });
});
app.post('/delete_proc', function(req, res) {
    var idVal = parseInt(req.body.id);
    dbModule.deleteItem(idVal, function() {
        console.log('id =', idVal, '글이 삭제되었습니다.');
        res.writeHead(302, {Location: '/'});
        res.end();
    });
});
app.get('/register', function(req, res) {
    var view = require('./view2/register');
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
    
    dbModule.isNewUser(userId, function(result) {
        if (result === undefined) {
            // 패스워드가 동일한지 확인
            if (password !== password2) {
                var view = require('./view2/alertMsg');
                var message = '패스워드가 일치하지 않습니다. 다시 입력하세요.';
                var url = '/register';
                var html = view.alertMsg(message, url);
                console.log(userId, '패스워드 불일치');
                res.writeHead(200);
                res.end(html);
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) {
                        console.error('bcrypt.genSalt() 에러:', err);
                        return;
                    } else {
                        bcrypt.hash(password, salt, null, function(err, hash) {
                            dbModule.registerUser(userId, userName, hash, tel, email, function() {
                                console.log(userId, '사용자 등록 완료');
                                res.writeHead(302, {Location: '/'});
                                res.end();
                            });
                        });
                    }
                });
            }
        } else {
            console.log(userId, '중복된 사용자 ID 있음');
            var view = require('./view2/alertMsg');
            var message = 'ID가 이미 존재합니다. 다른 ID를 사용하세요.';
            var url = '/register';
            var html = view.alertMsg(message, url);
            res.writeHead(200);
            res.end(html);
        }
    });
});
app.get('/login', function(req, res) {
    var view = require('./view2/login');
    var html = view.login();
    res.writeHead(200);
    res.end(html);
});
app.post('/login_proc', function(req, res) {
    var userId = req.body.id;
    var password = req.body.password;
    //console.log('login', userId, password);
    
    dbModule.getPassword(userId, function(result) {
        if (result === undefined) {
            console.log(userId, "없는 사용자 ID 에러");
            var view = require('./view2/login');
            var html = view.login();
            res.writeHead(200);
            res.end(html);
        } else {
            var userName = result.name;
            bcrypt.compare(password, result.password, function(err, result) {
                if (err) {
                    console.error('bcrypt.compare() 에러', err);
                    return; 
                }
                if (result) {
                    console.log(userId, "로그인 성공");
                    req.session.userId = userId;
                    req.session.userName = userName;
                    res.writeHead(302, {Location: '/'});
                    res.end();
                } else {
                    console.log(userId, "패스워드 불일치");
                    var view = require('./view2/login');
                    var html = view.login();
                    res.writeHead(200);
                    res.end(html);
                }
            });
        }
    });
});
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.writeHead(302, {Location: '/'});
    res.end();    
});
app.listen(3000);