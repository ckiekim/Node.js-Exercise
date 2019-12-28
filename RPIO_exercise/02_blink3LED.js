var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);

for (var i=0; i<5; i++) {
    rpio.write(RED, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(RED, rpio.LOW);
    rpio.write(GREEN, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.LOW);
    rpio.write(YELLOW, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(RED, rpio.HIGH);
    rpio.write(GREEN, rpio.HIGH);
    rpio.sleep(1);
    rpio.write(RED, rpio.LOW);
    rpio.write(GREEN, rpio.LOW);
    rpio.write(YELLOW, rpio.LOW);
    rpio.sleep(1);  
}

rpio.close(RED);
rpio.close(GREEN);
rpio.close(YELLOW);
