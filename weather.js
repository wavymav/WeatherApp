// Requiring the EventEmitter from the events node module
// Requiring the util node module
// Requiring the http node module
// Requiring apiKey.js
// Requiring eventConfig.js
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var http = require('http');
var apiKey = require('./apiKey');
var eventConfig = require('./eventConfig').events;

// Weather function constuctor object
function Weather(cityName) {
	// Weather now has access to the EventEmitter's constructor properties & methods
	// Inherits the constructor
	EventEmitter.call(this);
	weatherEmitter = this;

		// Connecting to the OpenWeatherMap API
		var req = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial=' + apiKey, function(res){

		});
}

// Weather constructor object gains access to the EventEmitter's prototype chain
// Inherits the prototype chain
util.inherits(Weather, EventEmitter);
