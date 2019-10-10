var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/users'     // users collection에 접속

MongoClient.connect(url, function(error, db) {
    console.log('MongoDB 연결 성공');
    var users = db.collection('users');
    /*     
    users.find({$or: [{pos:{$gte:6, $lt:10}}, {pos:{$gt:80, $lte:85}}]}).toArray(function(err, docs) {
        docs.forEach (doc, index, array) {
            console.log(doc);
        }
    }); 
    */
});

