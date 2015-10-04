// Requiring the node file module
var fs = require('fs');

var exports = module.exports = {};

var insertDataValues = function(dataValues, contentData) {
  // goes through each property of the passed in objects
  for (var prop in dataValues) {
		// contentData is a string thats why I can call the replace method on it

    // Uses the replace method to replace the {placeHolder} with the actual objects property value
    contentData = contentData.replace("{" + prop + "}", dataValues[prop]);
  }
  //return merged content
  return contentData;
};

exports.renderTemplateView = function(templateName, res, dataValues) {
	// Synchronously reading the file content from the specified loction and storing the content in htmlContent var

	// Passing utf8 as a parameter to read the file in as a string.
	var htmlContent = fs.readFileSync(__dirname + '/templateViews/' + templateName +'.html', 'utf8');

	// Stores the dataValues in the HTML template
	htmlContent = insertDataValues(dataValues, htmlContent);

	// takes the htmlContent and write it the response object
	res.write(htmlContent);
};
