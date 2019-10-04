var querystring = require('querystring');

var queryObj = {
    name: '아이유',
    best: '좋은날'
};

var queryStr = querystring.stringify(queryObj);
console.log(queryStr);
// name=%EC%95%84%EC%9D%B4%EC%9C%A0&best=%EC%A2%8B%EC%9D%80%EB%82%A0