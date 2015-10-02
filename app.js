// Requiring the node http module
var http = require('http');
var routes = require('./routes');


// Creating the web server
http.createServer(function(req, res) {
	routes.home(req, res);
}).listen(3000, '127.0.0.1');
console.log('Server running on localhost:3000');
