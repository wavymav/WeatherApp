// Requiring the EventEmitter from the events node module
// Requiring the util node module
// Requiring the http node module
// Requiring apiKey.js
// Requiring eventConfig.js events property values
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
		res.on(eventConfig.DATA, function(data) {
			// Concats the each data chunk to the bodyData var
			bodyData += data;
			weatherEmitter.emit(eventConfig.DATA, data);
		});

		// Using the 'end' event handler to access the data stored in bodyData after the
		// concatenation of data complets in the 'data' event handler.
		res.on(eventConfig.END, function() {
			if (res.statusCode === 200) {
				// Using the try catch block to find any parsing errors
				try {
					// Parsing the JSON data & storing it in weatherData var
				 	var weatherData = JSON.parse(bodyData);
					weatherEmitter.emit(eventConfig.END, weatherData);
				} catch (err) {
					weatherEmitter.emit(eventConfig.ERROR, err);
				}
			}
		}).on(eventConfig.ERROR, function(err){
			weatherEmitter.emit(eventConfig.ERROR, err);
	  });

	});

	// Handling error events on the request object
	req.on(eventConfig.ERROR, function(err) {
		console.error('There was an error: ' + err.message);
	});
}

// Weather constructor object gains access to the EventEmitter's prototype chain
// Inherits the prototype chain
util.inherits(Weather, EventEmitter);

module.exports = Weather;
