// Requiring the node file module
var fs = require('fs');

var exports = module.exports = {};

exports.renderTemplateView = function(templateName, res, dataValues) {
	// Synchronously reading the file content from the specified loction and storing the content in htmlContent var
	var htmlContent = fs.readFileSync(__dirname + '/templateViews/' + templateName +'.html');

	// takes the htmlContent and write it the response object
	res.write(htmlContent);
};
