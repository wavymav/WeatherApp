// Requiring the node file module
var fs = require('fs');
var Weather = require('./weather');

var exports = module.exports = {};

// Storing the content type object in contentTypeHeader var
var contentTypeHeader = {'Content-Type': 'text/html'};

// setting up the home route
exports.homeSearch = function(req, res) {
	// If the req.url is '/' then you're in the root dir
	if (req.url === '/') {
		res.writeHead(200, contentTypeHeader);
		// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
		var htmlContent = fs.readFileSync(__dirname + '/HTMLmockups/search.html');
		// When the response ends/finish the htmlContent is sent to the server
		res.end(htmlContent);
	}
};

exports.weatherReport = function(req, res) {
	// Replacing the req.url root('/') with an empty string
	var cityName = req.url.replace('/', '');

	if (cityName.length > 0) {
		res.writeHead(200, contentTypeHeader);
		// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
		var htmlContent = fs.readFileSync(__dirname + '/HTMLmockups/weather.html');
		// When the response ends/finish the htmlContent is sent to the server
		res.end(htmlContent);
	}
};
