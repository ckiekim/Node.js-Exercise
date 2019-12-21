var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

try {
    if(fs.accessSync('./db')) {
        console.log('DB 폴더가 이미 존재합니다.');
    }
} catch(err) {
    console.log('DB 폴더가 없어서 새로 생성합니다.');
    fs.mkdirSync('./db');
    //console.log(err);
};

var db = new sqlite3.Database("db/bbs.db");

var createSql = `
    CREATE TABLE IF NOT EXISTS bbs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        writer TEXT NOT NULL,
        timestamp datetime default CURRENT_TIMESTAMP,
        content TEXT)
`;
var insertSql = "INSERT INTO bbs(id, title, writer, content) VALUES(100, 't1', 'w1', 'content 1')";
var selectSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs";
var records = [
    {title: '동백꽃 필 무렵', writer: 'dblee', content:'편견에 갇힌 맹수 동백을 깨우는, 촌므파탈 황용식이의 폭격형 로맨스 "사랑하면 다 돼!"'},     // 임상춘
    {title: '미스터 션샤인', writer: 'eskim', content:'신미양요(1871년) 때 군함에 승선해 미국에 떨어진 한 소년이 미국 군인 신분으로 자신을 버린 조국인 조선으로 돌아와 주둔하며 벌어지는 일을 그린'}
];

db.serialize(function() {
    db.run(createSql);
    db.run(insertSql);

    var sql = 'INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)';
    var stmt = db.prepare(sql);
    records.forEach(function(record) {
        stmt.run(record.title, record.writer, record.content);
    });
    stmt.finalize();
    db.run('DELETE FROM bbs where id=100');

    db.each(selectSql, function(err, row) {
        console.log(row.id, row.title, row.writer, row.ts)
        console.log('\t' + row.content);
    });
});

db.close();
