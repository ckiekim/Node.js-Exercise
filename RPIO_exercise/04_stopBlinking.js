var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(function() {
	rpio.write(RED, rpio.read(RED) ^ 1);
}, 200);

function pollcb(pin)
{
    clearInterval(iv);

    console.log('Button pressed on pin P%d', pin);
    rpio.poll(SWITCH, null);
    rpio.close(RED);
    rpio.close(SWITCH); 
}

rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);
