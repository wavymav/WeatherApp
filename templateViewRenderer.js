// Requiring the node file module
var fs = require('fs');

var exports = module.exports = {};

exports.renderTemplateView = function(template, dataValues, res) {
	// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
	var htmlContent = fs.readFileSync(__dirname + '/HTMLmockups/' + template +'.html');

	// takes the htmlContent and write it the response object
	res.write(htmlContent);
};
