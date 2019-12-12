var sqlite3 = require('sqlite3').verbose();
var file = "db/my.db";
var db = new sqlite3.Database(file);

sql = ` CREATE TABLE IF NOT EXISTS Bbs
        (id INT NOT NULL,
         title TEXT NOT NULL,
         writer TEXT NOT NULL,
         datetime TEXT,
         content TEXT,
         PRIMARY KEY(id));`
db.run(sql);
db.close();