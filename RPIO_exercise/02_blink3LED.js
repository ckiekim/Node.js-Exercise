var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10

rpio.open(RED, rpio.OUTPUT, rpio.HIGH);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);

// Toggle the state of the LED every 200ms
const iv = setInterval(function() {
    rpio.write(RED, rpio.read(RED) ^ 1);
    rpio.write(GREEN, rpio.read(GREEN) ^ 1);
    rpio.write(YELLOW, rpio.read(YELLOW) ^ 1);
}, 200);

// Stop blinking the LED after 5 seconds
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);
}, 5000);
