var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

// YYYY-mm-dd HH:MM:SS 형식으로 날짜/시간 읽기
var sql_ts = "SELECT datetime(timestamp, 'localtime') ts FROM bbs";
db.each(sql_ts, function(err, row) {
    console.log(row.ts);
});

// YYYYmmddHHMM 형식으로 날짜/시간 읽기
sql_ts = "SELECT strftime('%m%d%H%M', timestamp, 'localtime') ts FROM bbs";
db.each(sql_ts, function(err, row) {
    console.log(row.ts);
});

// 일괄 추출
var sql = "SELECT id, title, writer, datetime(timestamp, 'localtime') ts, content FROM bbs";
db.all(sql, function(err, rows) {
    rows.forEach(function (row) {
        console.log('all', row.id, row.title, row.writer, row.ts, row.content);
    });
});	

// 라인단위 추출
sql = "SELECT id, title, writer, strftime('%m%d%H%M', timestamp, 'localtime') ts, content FROM bbs";
db.each(sql, function(err, row) {
    console.log('each', row.id, row.title, row.writer, row.ts, row.content);
});

sql = "SELECT strftime('%Y%m%d%H%M', 'now', 'localtime') ts";
db.get(sql, function(err, row) {
    console.log(row.ts);
});

db.close();