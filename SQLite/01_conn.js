var sqlite3 = require('sqlite3').verbose();
var file = "db/dbdemos.db";
var db = new sqlite3.Database(file);

db.all("SELECT * FROM country WHERE Population > 10000000", function(err, rows) {
    rows.forEach(function (row) {
        console.log(row.Name, row.Capital, row.Area, row.Population);
    });
});	

db.close();