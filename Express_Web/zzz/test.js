const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("db/bbs.db");
const searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
const incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
const misc = require('./view/misc3');

var idVal = 101;
db.serialize(function() {
    var stmt = db.prepare(incHitSql);
    stmt.run(idVal, idVal);
    stmt.finalize();

    let stmt2 = db.prepare(searchSql);
    stmt2.get(idVal, function(err, row) {
        //console.log(row);
        let _content = row.content;
        let content = _content.replace(/\r\n/g, '<br>');
        let trs = misc.tableItem(row, content);
        console.log(trs);
        let view = require('./view/itemView');
        let html = view.itemView('', trs);
        console.log(html);
    });
    stmt2.finalize();
});