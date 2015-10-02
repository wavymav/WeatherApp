// Requiring the node file module
var fs = require('fs');

var exports = module.exports = {};

// Storing the content type object in contentTypeHeader var
var contentTypeHeader = {'Content-Type': 'text/html'};

// setting up the home route
exports.home = function(req, res) {
	if (req.url === '/') {
		res.writeHead(200, contentTypeHeader);
		// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
		var htmlContent = fs.readFileSync(__dirname + '/HTMLmockups/search.html');
		// When the response ends/finish the htmlContent is sent to the server
		res.end(htmlContent);
	}
};
