# WeatherApp
This is a basic Node.js web app that allows a user to find out the current weather for any city in the world. The Node.js app
retrieves the current weather data from the OpenWeatherMap API and dynamically displays the content to the webpage.

![Weather App](https://raw.githubusercontent.com/wavymav/WeatherApp/master/img/weather-app.png?raw=true "Weather In College Park")

**Note:** *program will not work without an OpenWeatherMap API Key of your own.*

My command-line version of the weather app was a starting point for this web app. Instead of creating another `get` function for the `http.get()` method for the OpenWeatherMap API, I used a function constructor called `Weather` that takes city name as a parameter in `weather.js`. I wanted the `Weather` function constructor to directly inherit the `event` modules `EventEmiter` function constructor properties and methods, essentially making `Weather` an `EventEmiter`. I also made sure to use the `util` module to allow the `Weather` constructor to have access to the `EventEmitter` prototype chain. Doing this allowed me to set up `.on()` methods on the `new Weather(cityName)` instance in my `routes.js`.

- The Weather constructor is solely responsible for getting the JSON data from the OpenWeatherMap API.

**Note:** *I used my config.js to hold all the magic string values.(templateViews & events)*
```javascript
// weather.js
var EventEmitter = require('events').EventEmitter; // Requiring the EventEmitter from the events node module
var util = require('util'); // Requiring the util node module
var http = require('http'); // Requiring the http node module
var apiKey = require('./apiKey'); // Requiring apiKey.js
var events = require('./config').events; // Requiring config.js events property values

function Weather(cityName) {
	EventEmitter.call(this);
	weatherEmitter = this;

	// Connecting to the OpenWeatherMap API
	var req = http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial=' + apiKey, function(res){
		var bodyData = '';
		console.log(res.statusCode);
		console.log(http.STATUS_CODES[res.statusCode]);

		if (res.statusCode !== 200) {
			// Abort Request
			req.abort();
			console.log('request aborted!');
		}

		res.on(events.DATA, function(data) {
			bodyData += data;
			weatherEmitter.emit(events.DATA, data);
		});

		res.on(events.END, function() {
			if (res.statusCode === 200) {
				try {
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
	
	req.on(events.ERROR, function(err) {
		console.error('There was an error: ' + err.message);
	});
}
```


I used Node.js's API's to create a web server that would dynamically display data and content to the web browser based on the user input. 
-  The Node.js server used my custom routes `home` & `weatherReport` to dynamically generate my custom `templateViews` to the browser.

```javascript
// app.js
var http = require('http'); // Requiring the node http module
var routes = require('./routes'); // Requiring all routes

http.createServer(function(req, res) {
	routes.homeSearch(req, res);
	routes.weatherReport(req, res);
}).listen(3000, '127.0.0.1');
console.log('Server running on localhost:3000');
```

The `routes.js` file was tasked with handling routes and rendering the proper `templateViews` based on the response. The `/` or root gains access to the home search route and `/cityName` was used to gain access to the weather report page along with the OpenWeatherMap API JSON data returned merged with the `templateViews`. I also made sure handle any response errors by rendering error `templateViews`.

```javascript
// routes.js
var Weather = require('./weather'); // Requiring the Weather function constructor
var querystring = require("querystring"); // Requiring the querystring module
var events = require('./config').events; // Requiring config.js events property values
var views = require('./config').templateViews; // Requiring config.js views property values
var render = require('./templateViewRenderer'); // Requring the templateViewRenderer
var removeDecimals = require('./helpers').removeDecimalAndDigits; // Requring the temperature helper
var getIcon = require('./helpers').getWeatherIcon; // Requring the getWeatherIcon helper
var exports = module.exports = {};

var contentType = {'Content-Type': 'text/html'};

exports.homeSearch = function(req, res) {
	if (req.url === '/') {
		if (req.method.toUpperCase() === 'GET') {
			res.writeHead(200, contentType);
			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.HEADSEARCH, res);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.FOOTER, res);
			res.end();
		} else {
			req.on(events.DATA, function(postData) {
				var query = querystring.parse(postData.toString());
				res.writeHead(303, { 'Location':'/' + query.city });
				res.end();
			});
		}
	}
};

exports.weatherReport = function(req, res) {
	var cityName = req.url.replace('/', '');

	if (cityName.length > 0) {
		res.writeHead(200, contentType);
		
		var currentWeather = new Weather(cityName);
		
		currentWeather.on(events.END, function(weatherJSON) {
			var weatherData = {
				currentCity: weatherJSON.name,
				currentCountry: weatherJSON.sys.country,
				currentTemp: removeDecimals(weatherJSON.main.temp),
				currentIcon: getIcon(weatherJSON.weather[0].id, weatherJSON.weather[0].icon),
				currentDescipt: weatherJSON.weather[0].description,
				highTemp: removeDecimals(weatherJSON.main.temp_max),
				lowTemp: removeDecimals(weatherJSON.main.temp_min)
			};
			
			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.WEATHER, res, weatherData);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.FOOTER, res);
			res.end();
		});

		currentWeather.on(events.ERROR, function(err) {
			render.renderTemplateView(views.HEADER, res);
			render.renderTemplateView(views.HEADSEARCH, res);
			render.renderTemplateView(views.SEARCH, res);
			render.renderTemplateView(views.ERROR, res, {errMessage: err.message});
			render.renderTemplateView(views.FOOTER, res);
			res.end();
		});
	}
};
```
The render module `./templateViewRenderer` in `/routes.js` is responsible for getting the property values of the passed in JSON data and merging that data to the read in templateView file by using the Node `fs` module. 
- The `insertDataValues()` uses a for in loop to find and replace the matching property names with the property values
- The `renderTemplateView()` uses the `fs.readFileSync()` method read in the file from a specific location. Since I used the `.replace()` method in `insertDataValues()`, I had to convert the file being returned into a string. The `fs.readFileSync()` returns a buffer by default so I needed to convert this into a string. I did this by passing another argument that specifies the type of character encoding I want, which is `utf8`. This allow the content to be read in and manipulated as a string.

```javascript
// templateViewRenderer
var fs = require('fs'); // Requiring the node file module

var exports = module.exports = {};

var insertDataValues = function(dataValues, contentData) {
  for (var prop in dataValues) {
    contentData = contentData.replace("{" + prop + "}", dataValues[prop]);
  }
  return contentData;
};

exports.renderTemplateView = function(templateName, res, dataValues) {
	var htmlContent = fs.readFileSync(__dirname + '/templateViews/' + templateName +'.html', 'utf8');
	
	htmlContent = insertDataValues(dataValues, htmlContent);
	
	res.write(htmlContent);
};
```
