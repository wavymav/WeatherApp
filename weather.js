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
			// logging the response object status codes
			console.log(res.statusCode);
			console.log(http.STATUS_CODES[res.statusCode]);

			// If response object status code is not 200 (OK)
			if (res.statusCode !== 200) {
				// Abort Request
				req.abort();
				console.log('request aborted!');
			}

		});

		// Handling error events on the request object
		req.on(eventConfig.ERROR, function(error) {
			console.error('There was an error: ' + error.message);
		});
}

// Weather constructor object gains access to the EventEmitter's prototype chain
// Inherits the prototype chain
util.inherits(Weather, EventEmitter);

var currentWeather = new Weather('');
