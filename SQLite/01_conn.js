var sqlite3 = require('sqlite3').verbose();
var file = "db/test.db";
var db = new sqlite3.Database(file);
db.all("SELECT * FROM Movie_reviews limit 10", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.word, row.pos, row.count);
        });
	});	
db.close();