/*
 *  MVC BBS Web - DB Module
 */
const sqlite3 = require('sqlite3').verbose(); 

module.exports = {
    listItems: function(callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let listSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content, b.hit FROM bbs b join user u on b.userId=u.uid`;
        db.all(listSql, function(err, rows) {
            if (err) {
                console.error('listItems DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();      
    },
    incHit: function(idVal, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
        let stmt = db.prepare(incHitSql);
        stmt.run(idVal, idVal, function(err) {
            if (err) {
                console.error('incHit DB 에러', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    getItem: function(idVal, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
        let stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, result) {
            if (err) {
                console.error('getItem DB 에러', err);
                return;          
            }
            callback(result);
        });
        stmt.finalize();
        db.close();
    },
    /* viewItem: function(idVal, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        db.serialize(function() {
            let incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
            let stmt = db.prepare(incHitSql);
            stmt.run(idVal, idVal, function(err) {
                if (err) {
                    console.error('incHitSql 오류', err);
                    return;
                }
            });
            stmt.finalize();
            
            let searchSql = `SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?`;
            stmt = db.prepare(searchSql);
            stmt.get(idVal, function(err, row) {
                if (err) {
                    console.error('viewItem DB 오류', err);
                    return;
                }
                callback(row);
            });
            stmt.finalize();
        });
        db.close();
    }, */
    insertItem: function(title, userId, content, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
        let stmt = db.prepare(insertSql);
        stmt.run(title, userId, content, function(err) {
            if (err) {
                console.error('insertItem DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();  
        db.close();
    },
    updateItem: function(title, userId, content, idVal, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let updateSql = `UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
        let stmt = db.prepare(updateSql);
        stmt.run(title, userId, content, idVal, function(err) {
            if (err) {
                console.error('updateItem DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    deleteItem: function(idVal, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let deleteSql = `DELETE FROM bbs WHERE id=?`;
        let stmt = db.prepare(deleteSql);
        stmt.run(idVal, function(err) {
            if (err) {
                console.error('deleteItem DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    registerUser: function(uid, name, hash, tel, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let registerSql = `INSERT INTO user(uid, name, password, tel) VALUES(?, ?, ?, ?)`;
        let stmt = db.prepare(registerSql);
        stmt.run(uid, name, hash, tel, function(err) {
            if (err) {
                console.error('registerUser DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    getUserInfo: function(uid, callback) {
        let db = new sqlite3.Database("db/bbs.db");
        let searchUserSql = `SELECT uid, name, password, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
        let stmt = db.prepare(searchUserSql);
        stmt.get(uid, function(err, row) {
            if (err) {
                console.error('getUserInfo DB 에러', err);
                return;          
            }
            callback(row);            
        });
        stmt.finalize();
        db.close();        
    }
}
