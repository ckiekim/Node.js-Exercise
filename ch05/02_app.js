var greeting = require('./greeting');
greeting.hello();
greeting.goodNight();

var Bus = require('./bus').Bus;
var bus = new Bus();
bus.take();

var Metro = require('./bus').Metro;
var metro = new Metro();
metro.ride();

var Exercise = require('./exercise');
var exercise = new Exercise();
exercise.run();

var you = require('./student.js');
you.study();
you.study();
var him = require('./student.js');
him.study();