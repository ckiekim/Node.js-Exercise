var http = require('http');
var url = require('url');
var qs = require('querystring');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var MongoClient = require('mongodb').MongoClient
var dbUrl = 'mongodb://localhost:27017/bbstest';

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        if (queryData.id === undefined) {   // 게시판 목록
            MongoClient.connect(dbUrl, function (err, db) {
                if (err) {
                   console.error('MongoDB 연결 실패', err);
                   return;
                }
                //console.log('Start db reading');
                var bbs = db.collection('bbs');
                bbs.find().toArray(function (err, docs) {
                    var tr = '';
                    docs.forEach(function(doc) {
                        tr += '<tr>';
                        tr += `<td>${doc.id}</td>`;
                        tr += `<td><a href="/?id=${doc.id}">${doc.title}</a></td>`;
                        tr += `<td>${doc.writer}</td>`;
                        tr += `<td>${doc.time}</td>`;
                        tr += `<td><a href="/update?id=${doc.id}">수정</a>&nbsp;&nbsp;<a href="/delete?id=${doc.id}">삭제</a></td>`;
                        tr += '</tr>';
                        console.log(doc.id, doc.title, doc.writer, doc.time);
                    });
                    //console.log(tr);
                    var view = require('./view/list');
                    var html = view.list(tr);
                    response.writeHead(200);
                    response.end(html);
                });
             });
        } else {    // 게시판 개별 글 상세조회
            console.log(queryData.id);
            MongoClient.connect(dbUrl, function (err, db) {
                if (err) {
                   console.error('MongoDB 연결 실패', err);
                   return;
                }
                var bbs = db.collection('bbs');
                var idVal = parseInt(queryData.id);
                bbs.findOne({id: idVal}).then(function(result) {
                    console.log(result);
                    var view = require('./view/eachview');
                    var html = view.eachview(result.id, result.title, result.writer, result.time, result.content);
                    response.writeHead(200);
                    response.end(html);
                }, function(err) {
                    console.log('게시판 개별 글 상세조회 에러 : ', err);
                });
            });
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
            var id = parseInt(post.id);
            var title = post.title;
            var writer = post.writer;
            var content = post.content.replace(/\r\n/g, '<br>');
            var createTime = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(createTime);
            
            MongoClient.connect(dbUrl, function (err, db) {
                if (err) {
                    console.error('MongoDB 연결 실패', err);
                    return;
                }
                var bbs = db.collection('bbs');
                console.log(id, title, writer, content);
                // 도큐먼트 추가   
                bbs.insert({id: id, title: title, writer: writer, time: createTime, content: content}, function (err, result) {
                    if (err) {
                        console.error('Insert Error', err);
                        return;
                    }
                    //console.log('INERT 성공');
                    console.log('새로 추가한 항목의 ObjectID : ', result.insertedIds[0]);
                    //response.writeHead(302, {Location: '/'});
                    response.writeHead(302, {Location: `/?id=${id}`});
                    response.end();
                });
            });
        });
    } else if (pathname === '/update') {
    
    } else if (pathname === '/update_proc') {
    
    } else if (pathname === '/delete') {
    
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);