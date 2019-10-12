var http = require('http');
var url = require('url');
var qs = require('querystring');
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
                //var projection = {_id: 0, id: 1, title: 1, writer: 1, time: 1, content: 0};
                bbs.find().toArray(function (err, docs) {
                    var tr = '';
                    /* for (i = 0; i < docs.length; i++) {
                        doc = docs[i];
                        tr += '<tr>';
                        tr += `<td>${doc.id}</td>`;
                        tr += `<td>${doc.title}</td>`;
                        tr += `<td>${doc.writer}</td>`;
                        tr += `<td>${doc.time}</td>`;
                        tr += `<td>수정, 삭제</td>`;
                        tr += '</tr>';
                        console.log(doc.id, doc.title, doc.writer, doc.time);
                    } */
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
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);