var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17

rpio.open(RED, rpio.OUTPUT, rpio.LOW);

for (var i=0; i<5; i++) {
    rpio.write(RED, rpio.HIGH);
    rpio.sleep(1);
    rpio.write(RED, rpio.LOW);
    rpio.msleep(500);  
}

rpio.close(RED);
