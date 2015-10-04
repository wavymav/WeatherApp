// Requiring the Weather function constructor
// Requiring eventConfig.js events property values
var Weather = require('./weather');
var eventConfig = require('./eventConfig').events;
var render = require('./templateViewRenderer');

var exports = module.exports = {};

// Storing the content type object in contentTypeHeader var
var contentTypeHeader = {'Content-Type': 'text/html'};

// setting up the home route
exports.homeSearch = function(req, res) {
	// If the req.url is '/' then you're in the root dir
	if (req.url === '/') {
		res.writeHead(200, contentTypeHeader);

		// rendering the search MockUp to test
		render.renderTemplateView('search', null, res);
		// Ends response to the server
		res.end();
	}
};

exports.weatherReport = function(req, res) {
	// Replacing the req.url root('/') with an empty string
	var cityName = req.url.replace('/', '');

	if (cityName.length > 0) {
		// Setting the content mime type to plan text
		res.writeHead(200, {'Content-Type': 'text/plain'});

		// new weather function constructor instance
		var currentWeather = new Weather(cityName);

		// On END give me the JSON data
		currentWeather.on(eventConfig.END, function(weatherJSON) {
			var weatherData = {
				currentCity: weatherJSON.name,
				currentTemp: weatherJSON.main.temp,
				currentDescipt: weatherJSON.weather[0].description,
				highTemp: weatherJSON.main.temp_max,
				lowTemp: weatherJSON.main.temp_min
			};

			// Testing the response with the write method
			res.write('The cureent temperature in ' + weatherData.currentCity + ' is ' + weatherData.currentTemp + '.\n' +
								'Description: ' + weatherData.currentDescipt + '.\n' +
								'High: ' + weatherData.highTemp + '\n' +
							  'Low: ' + weatherData.lowTemp + '\n');

			// When the response ends/finish the htmlContent is sent to the server
			res.end('DONE');
		});

		currentWeather.on(eventConfig.ERROR, function(err) {
			// Testing the response durring an error event
			res.write(err.message + 'hahah\n');
			res.end('DONE');
		});
	}
};
