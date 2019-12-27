'use strict';

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');    // Export GPIO17 as an output

const blink = async function() {
	for (let i=0; i<5; i++) {
		led.writeSync(1);
		console.log('LED ON');
		await sleep(2000);
		led.writeSync(0);
		console.log('LED OFF');
		await sleep(1000);
	}
};
const sleep = function(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms);
	});
};

blink();
