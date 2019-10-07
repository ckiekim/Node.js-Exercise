// 객체 exports
var student = {
    hour: 0,
    study: function() {
        this.hour++;
        console.log(this.hour + '시간 공부 중');
    }
}
module.exports = student;