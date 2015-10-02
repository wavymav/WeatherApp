// Requiring the EventEmitter from the events node module
// Requiring the util node module
// Requiring the http node module
var EventEmitter = require("events").EventEmitter;
var util = require("util");
var http = require("http");

// Weather function constuctor object
function Weather(cityName) {
	// Weather now has access to the EventEmitter's constructor properties & methods
	// Inherits the constructor
	EventEmitter.call(this);
	weatherEmitter = this;
}

// Weather constructor object gains access to the EventEmitter's prototype chain
// Inherits the prototype chain
util.inherits(Weather, EventEmitter);
