var http = require('http'); // Requiring the node http module
var routes = require('./routes'); // Requiring all routes


// Creating the web server
http.createServer(function(req, res) {
	routes.homeSearch(req, res);
	routes.weatherReport(req, res);
}).listen(3000, '127.0.0.1');
console.log('Server running on localhost:3000');
