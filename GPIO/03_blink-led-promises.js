'use strict';

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');       // Export GPIO17 as an output
let stopBlinking = false;

// Toggle the state of the LED connected to GPIO17 every 200ms
const blinkLed = function() {
	if (stopBlinking)
		return led.unexport();

	led.read()
		.then(function(value) {	led.write(value ^ 1); })
		.then(function() { setTimeout(blinkLed, 200); })
		.catch(function(err) { console.log(err) });
};

blinkLed();

// Stop blinking the LED after 5 seconds
setTimeout(function() {
	stopBlinking = true;
}, 5000);
