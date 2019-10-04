var querystring = require('querystring');

var str = 'group=EXID&member=하니&member=솔지&member=LE&member=정화&member=혜린';
var parsed = querystring.parse(str);
console.log(parsed);

console.log('group : ', parsed.group);
console.log('member : ', parsed.member);
