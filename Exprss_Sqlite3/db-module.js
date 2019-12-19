/*
 *  MVC BBS Web
 *    - 사용 모듈: sqlite3, express, body-parser, express-session, session-file-store, bcrypt-nodejs
 *    - 게시판 기능: 목록, 생성, 조회, 수정, 삭제, 로그인/로그아웃, 사용자 등록
 */
var sqlite3 = require('sqlite3').verbose(); 

module.exports = {
    listItems: function(callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var listSql = "SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts FROM bbs";
        db.all(listSql, function(err, rows) {
            if (err) {
                console.error('SQLite3 DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();      
    },
    viewItem: function(idVal, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var viewSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs WHERE id=?";
        var stmt = db.prepare(viewSql);
        stmt.get(idVal, function(err, result) {
            if (err) {
                console.error('SQLite3 DB 오류', err);
                return;
            }
            stmt.finalize();
            callback(result);
        });
        db.close();
    },
    insertItem: function(title, writer, content, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var insertSql = "INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)";
        var stmt = db.prepare(insertSql);
        db.serialize(function() {
            stmt.run(title, writer, content);
            stmt.finalize();
            var lastIDSql = "SELECT id FROM bbs ORDER BY id DESC LIMIT 1";
            db.get(lastIDSql, function(err, result) {
                if (err) {
                    console.error('마지막 글 ID 조회 에러', err);
                    return;
                }
                callback(result.id);
            });
        });         
        db.close();
    },
    updateItem: function(idVal, title, content, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var updateSql = "UPDATE bbs SET title=?, timestamp=datetime('now'), content=? WHERE id=?";
        var stmt = db.prepare(updateSql);
        stmt.run(title, content, idVal, function() {
            console.log('updateItem:', idVal, title, content);
            stmt.finalize();
            callback();
        });
        db.close();
    },
    deleteItem: function(idVal, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var deleteSql = "DELETE FROM bbs WHERE id=?";
        var stmt = db.prepare(deleteSql);
        stmt.run(idVal, function() {
            console.log('deleteItem:', idVal);
            stmt.finalize();
            callback();
        });
        db.close();
    },
    isNewUser: function(userId, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var sameUserSql = "SELECT id FROM user WHERE id=?";
        var stmt = db.prepare(sameUserSql);
        stmt.get(userId, function(err, result) {
            if (err) {
                console.error('사용자 조회 에러', err);
                return;          
            }
            stmt.finalize();
            callback(result);
        });
        db.close();        
    },
    registerUser: function(userId, userName, hash, tel, email, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var registerSql = "INSERT INTO user VALUES(?, ?, ?, ?, ?)";
        var stmt = db.prepare(registerSql);
        stmt.run(userId, userName, hash, tel, email, function() {
            stmt.finalize();
            callback();
        });
        db.close();
    },
    getPassword: function(userId, callback) {
        var db = new sqlite3.Database("db/bbs.db");
        var getPasswordSql = "SELECT name, password FROM user WHERE id=?";
        var stmt = db.prepare(getPasswordSql);
        stmt.get(userId, function(err, result) {
            if (err) {
                console.error('로그인 DB 에러', err);
                return;          
            }
            stmt.finalize();
            callback(result);            
        });
        db.close();        
    }
}
