// 두개의 클래스 Bus, Metro
function BusDef() {
    this.take = function() {
        console.log('Bus taking');
    }
}

function MetroDef() {
    this.ride = function() {
        console.log('Metro riding')
    }
}

module.exports.Bus = BusDef;
exports.Metro = MetroDef;