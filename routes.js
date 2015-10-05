// Requiring the Weather function constructor
// Requiring config.js events property values
// Requiring config.js views property values
// Requring the templateViewRenderer
// Requring the temperature helper
var Weather = require('./weather');
var events = require('./config').events;
var views = require('./config').templateViews;
var render = require('./templateViewRenderer');
var removeDecimals = require('./helpers').removeDecimalAndDigits;

var exports = module.exports = {};

// Storing the content type object in contentTypeHeader var
var contentType = {'Content-Type': 'text/html'};

// setting up the home route
exports.homeSearch = function(req, res) {
	// If the req.url is '/' then you're in the root dir
	if (req.url === '/') {
		// making sure the request method is GET
		if (req.method.toUpperCase() === 'GET') {
			res.writeHead(200, contentType);

			// rendering the search view templates for test
			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.HEADSEARCH, res);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.FOOTER, res);

			// Ends response to the server
			res.end();
		} else {
			// else get the POST querystring data
			// In this case is the city=''
			req.on(events.DATA, function(bodyData) {
				console.log(bodyData.toString());
			});
		}
	}
};

exports.weatherReport = function(req, res) {
	// Replacing the req.url root('/') with an empty string
	var cityName = req.url.replace('/', '');

	if (cityName.length > 0) {
		// Setting the content mime type to plan text
		res.writeHead(200, contentType);

		// new weather function constructor instance
		var currentWeather = new Weather(cityName);

		// On END give me the JSON data
		currentWeather.on(events.END, function(weatherJSON) {
			var weatherData = {
				currentCity: weatherJSON.name,
				currentCountry: weatherJSON.sys.country,
				currentTemp: removeDecimals(weatherJSON.main.temp),
				currentDescipt: weatherJSON.weather[0].description,
				highTemp: removeDecimals(weatherJSON.main.temp_max),
				lowTemp: removeDecimals(weatherJSON.main.temp_min)
			};

			// // Testing the response with the write method
			// res.write('The cureent temperature in ' + weatherData.currentCity + ' is ' + weatherData.currentTemp + ',' + weatherData.currentCountry +'.\n' +
			// 					'Description: ' + weatherData.currentDescipt + '.\n' +
			// 					'High: ' + weatherData.highTemp + '\n' +
			// 				  'Low: ' + weatherData.lowTemp + '\n');

			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.WEATHER, res, weatherData);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.FOOTER, res);

			// Ends response to the server
			res.end();
		});

		currentWeather.on(events.ERROR, function(err) {
			// // Testing the response durring an error event
			// res.write(err.message + '\n');


			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.HEADSEARCH, res);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.ERROR, res, {errMessage: err.message});
			render.renderTemplateView(views.FOOTER, res);

			// Ends response to the server
			res.end();
		});
	}
};
