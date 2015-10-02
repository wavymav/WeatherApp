// Requiring the node http module
// Requiring the node file module
var http = require('http'),
		fs = require('fs');

// Storing the content type object in contentTypeHeader var
var contentTypeHeader = {'Content-Type': 'text/html'};

// Creating the web server
http.createServer(function(req, res) {
	res.writeHead(200, contentTypeHeader);
	// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
	var htmlContent = fs.readFileSync(__dirname + '/HTMLmockups/weather.html');
	// When the response ends/finish the htmlContent is sent to the server
	res.end(htmlContent);
}).listen(3000, '127.0.0.1');

console.log('Server running on localhost:3000');
