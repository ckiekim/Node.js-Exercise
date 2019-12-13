var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

sql = `
    CREATE TABLE IF NOT EXISTS bbs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        writer TEXT NOT NULL,
        timestamp datetime default CURRENT_TIMESTAMP,
        content TEXT)
    `;
db.run(sql);
db.close();
