// Requiring the node http module
var http = require('http');

// Storing the content type object in contentTypeHeader var
var contentTypeHeader = {'Content-Type': 'text/plain'};

// Creating the web server
http.createServer(function(req, res) {
	res.writeHead(200, contentTypeHeader);
	res.end("Hello!\n");
}).listen(3000, '127.0.0.1');

console.log('Server running on localhost:3000');
