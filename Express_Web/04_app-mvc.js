/*
 *  MVC BBS Web - Controller Module
 */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const sanitizeHtml = require('sanitize-html');      // XSS(Cross-site scripting) 방지
const wm = require('./03_weather-module');
const template = require('./view3/template');
const alert = require('./view3/alertMsg');
const dbModule = require('./04_db-module');

const app = express();
const userRouter = require('./03_userRouter');

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
    dbModule.listItems(function(rows) {
        let trs = '';
        for(let row of rows) {
            trs += template.tableMain(row);
        }
        wm.getWeather(function(weather) {
            let navBar = template.navMain(req.session.userName, weather);
            let view = require('./view3/index');
            let html = view.index(navBar, trs);
            res.send(html);
        });
    });
});
app.get('/id/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    dbModule.incHit(idVal, function() {
        dbModule.getItem(idVal, function(row) {
            wm.getWeather(function(weather) {
                let navBar = template.navList(req.session.userName, idVal, weather);
                let trs = template.tableItem(row);
                let view = require('./view3/itemView');
                let html = view.itemView(navBar, trs);
                res.send(html);
            });
        });
    });
    /* dbModule.viewItem(idVal, function(row) {
        wm.getWeather(function(weather) {
            let navBar = template.navList(req.session.userName, idVal, weather);
            let trs = template.tableItem(row);
            let view = require('./view3/itemView');
            let html = view.itemView(navBar, trs);
            res.send(html);
        });
    }); */
});
app.get('/create', function(req, res) {
    wm.getWeather(function(weather) {
        let navBar = template.navOp(req.session.userName, weather);
        let view = require('./view3/create');
        let html = view.create(navBar);
        res.send(html);
    });
});
app.post('/create', function(req, res) {
    let title = sanitizeHtml(req.body.title);
    let userId = req.session.userId;
    let content = sanitizeHtml(req.body.content, {
        allowedTags: ['img'],
        allowedAttributes: {'img': ['src', 'width', 'height']},
    });
    dbModule.insertItem(title, userId, content, function() {
        res.redirect('/');
    });
});
app.get('/update/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    dbModule.getItem(idVal, function(row) {
        if (row.userId === req.session.userId) {
            wm.getWeather(function(weather) {
                let navBar = template.navOp(req.session.userName, weather);
                let view = require('./view3/update');
                let html = view.update(navBar, row);
                res.send(html);
            });
        } else {
            let html = alert.alertMsg('수정 권한이 없습니다.', `/id/${idVal}`);
            res.send(html);
        }
    });
});
app.post('/update', function(req, res) {
    let idVal = parseInt(req.body.id);
    let title = sanitizeHtml(req.body.title);
    let userId = req.session.userId;
    let content = sanitizeHtml(req.body.content, {
        allowedTags: ['img'],
        allowedAttributes: {'img': ['src', 'width', 'height']},
    });
    dbModule.updateItem(title, userId, content, idVal, function() {
        res.redirect(`/id/${idVal}`);
    });
});
app.get('/delete/:id', function(req, res) {
    let idVal = parseInt(req.params.id);
    dbModule.getItem(idVal, function(row) {
        if (row.userId === req.session.userId) {
            wm.getWeather(function(weather) {
                let navBar = template.navOp(req.session.userName, weather);
                let view = require('./view3/delete');
                let html = view.delete(navBar, row);
                res.send(html);
            });
        } else {
            let html = alert.alertMsg('삭제 권한이 없습니다.', `/id/${idVal}`);
            res.send(html);
        }
    });
});
app.post('/delete', function(req, res) {
    let idVal = parseInt(req.body.id);
    dbModule.deleteItem(idVal, function() {
        res.redirect('/');
    });
});
app.get('/weather', function(req, res) {
    wm.weatherObj(function(weather, table) {
        var navBar = template.navMain(req.session.userName, weather);
        var view = require('./view3/weather'); 
        var html = view.weather(navBar, table);
        res.send(html);
    });
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});

app.listen(3000);