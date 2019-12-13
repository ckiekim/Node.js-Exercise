var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

var sql_ts1 = "SELECT datetime(timestamp, 'localtime') ts FROM bbs";
var sql_ts2 = "SELECT strftime('%m%d%H%M', datetime(timestamp, 'localtime')) ts FROM bbs";
var sql_ts3 = "SELECT strftime('%Y%m%d%H%M', datetime('now', 'localtime')) ts";
var sql1 = "SELECT id, title, writer, datetime(timestamp, 'localtime') ts, content FROM bbs";
var sql2 = "SELECT id, title, writer, strftime('%m%d%H%M', datetime(timestamp, 'localtime')) ts, content FROM bbs";

db.serialize(function() {
    db.each(sql_ts1, function(err, row) {
        console.log(row.ts);
    });
    
    db.each(sql_ts2, function(err, row) {
        console.log(row.ts);
    });
    
    db.get(sql_ts3, function(err, row) {
        console.log(row.ts);
    });

    db.all(sql1, function(err, rows) {
        rows.forEach(function (row) {
            console.log('all', row.id, row.title, row.writer, row.ts, row.content);
        });
    });	
    
    db.each(sql2, function(err, row) {
        console.log('each', row.id, row.title, row.writer, row.ts, row.content);
    });
});

db.close();