var EventEmitter = require('events').EventEmitter; // Requiring the EventEmitter from the events node module
var util = require('util'); // Requiring the util node module
var http = require('http'); // Requiring the http node module
var apiKey = require('./apiKey'); // Requiring apiKey.js
var events = require('./config').events; // Requiring config.js events property values

// Weather function constuctor object
function Weather(cityName) {
	// Weather now has access to the EventEmitter's constructor properties & methods
	// Inherits the constructor
	EventEmitter.call(this);
	weatherEmitter = this;

	// Connecting to the OpenWeatherMap API
	var req = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial=' + apiKey, function(res){
		// declaring and empty string called bodyData to store the enitre reponse body data
		// form the stream chunks.
		var bodyData = '';

		// logging the response object status codes
		console.log(res.statusCode);
		console.log(http.STATUS_CODES[res.statusCode]);

		// If response object status code is not 200 (OK)
		if (res.statusCode !== 200) {
			// Abort Request
			req.abort();
			console.log('request aborted!');
		}

		// Using the 'data' event handler to pass in the chunks of data from the response.
		res.on(events.DATA, function(data) {
			// Concats the each data chunk to the bodyData var
			bodyData += data;
			weatherEmitter.emit(events.DATA, data);
		});

		// Using the 'end' event handler to access the data stored in bodyData after the
		// concatenation of data complets in the 'data' event handler.
		res.on(events.END, function() {
			if (res.statusCode === 200) {
				// Using the try catch block to find any parsing errors
				try {
					// Parsing the JSON data & storing it in weatherData var
				 	var weatherData = JSON.parse(bodyData);
					weatherEmitter.emit(events.END, weatherData);
				} catch (err) {
					weatherEmitter.emit(events.ERROR, err);
				}
			}
		}).on(events.ERROR, function(err){
			weatherEmitter.emit(events.ERROR, err);
	  });

	});

	// Handling error events on the request object
	req.on(events.ERROR, function(err) {
		console.error('There was an error: ' + err.message);
	});
}

// Weather constructor object gains access to the EventEmitter's prototype chain
// Inherits the prototype chain
util.inherits(Weather, EventEmitter);

module.exports = Weather;
