var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/bbstest';
var ObjectID = require('mongodb').ObjectID;
var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }
   db = database;
/*    var promise = db.collection('bbs').insertMany([
      {id:101, title: '스타워즈', writer: '조지 루카스', time: '2019-10-12 00:06:01'},
      {id:102, title: '게시판 글', writer: 'JJ 에이브럼스', time: '2019-10-12 00:06:32'}]);
   promise.then(function(results) {
      console.log('초기 데이터 입력 성공');
      executeFindExample();
   }, function(err) {
      console.error('Error : ', err);      
   }); */
   executeFindExample();
});


function executeFindExample() {
   // 콜렉션
   var bbs = db.collection('bbs');
   
   // projection
   var projection = {_id: 0, id: 1, title: 1, writer: 1, time: 1, content: 0};
   var idVal;   
   bbs.find().toArray(function (err, docs) {
      console.log('============ Find ALL, toArray');
      console.log(docs.length);
      docs.forEach(function(doc) {
         console.log(doc._id, doc.id, doc.title, doc.writer, doc.time);     
         idVal = doc._id.toString();
         bbs.findOne({_id: idVal}).then(function(result) {
            console.log('----------------- Find One');
            console.log(result);
         }, function(err) {
            console.log(err);
         });
      });
   });
   idVal = '5da16543a10c3114b8b5ae7f';
   bbs.findOne({_id: idVal}).then(function(result) {
      console.log('----------------- Find One');
      console.log(result);
   }, function(err) {
      console.log(err);
   });
/*    // projection
   movies.find({}, projection).toArray(function (err, docs) {
      console.log('============ Find ALL with Projection');
      console.log(docs);
   });

   // Query
   movies.find({title: '인터스텔라'}).toArray(function (err, docs) {
      console.log('============ Find 인터스텔라');
      console.log(docs);
   });
      
   // Query : db.movies.find({year:{$gt:2000} })
   movies.find({year: {$gt: 2000 }}).toArray(function (err, docs) {
      console.log('============ 2000년 이후의 영화');
      console.log(docs);
   });
   
   // Query : db.movies.find({ $or:[ { year: {$gt:2000} },{ director:"크리스토퍼 놀란" } ] } )
   movies.find({$or: [{year: {$gt: 2000 }}, {director: "크리스토퍼 놀란"}]}).toArray(function (err, docs) {
      console.log('============ OR Query');
      console.log(docs);
   });
   
   // limit(5)
   movies.find({}).limit(2).toArray(function (err, docs) {
      console.log('============ limit');
      console.log(docs);
   });
   
   // ObjecdtID
   movies.findOne({}).then(function(result) {
      var objectIDStr = result._id.toString();
      
      movies.findOne({_id:objectIDStr}).then(function(result) {
         console.log('Find By ID Str : \n', result);
      }, function(err) {
         console.log('Find By ID Str Error : ', err);
      });
      
      movies.findOne({_id:new ObjectID(objectIDStr)}).then(function(result) {
         console.log('Find By ObjectID : \n', result);
      }, function(err) {
         console.log('Find By ObjectID Error : ', err);
      });
   }); */
}