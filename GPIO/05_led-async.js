'use strict';

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');    // Export GPIO17 as an output
let stopBlinking = false;

const blinkLed = function() {
	if (stopBlinking)
		return led.unexport();

	led.read(function(err, value) { // Asynchronous read
        if (err) 
            throw err;
        if (value == 0)
            console.log('LED ON');
        else
            console.log('LED OFF');
		led.write(value ^ 1, function(err) { // Asynchronous write
            if (err) 
                throw err;
		});
	});

	setTimeout(blinkLed, 1000);
};

blinkLed();

// Stop blinking the LED after 5 seconds
setTimeout(function() {
	stopBlinking = true
}, 10000);