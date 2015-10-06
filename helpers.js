var exports = module.exports = {};

// Converts the number data type into a string data type
var convertToString =  function(number) {
	var string = number.toString();

	return string;
};

// Checking the icon code to if its day or night
var isNightTime = function(iconCode) {
	var check = iconCode.indexOf('n');

	if (check === -1) {
		return false;
	} else {
		return true;
	}
};

// removes the deciaml and digits from the temperature string passed in
exports.removeDecimalAndDigits = function(number) {
	var	string = convertToString(number);
	// finds the index of the deciaml or ('.' character) in the string
	var endIndex = string.indexOf('.');
	// value decloration
	var value;

	// if '.' does not exits in the string do not call slice method
	if (endIndex === -1) {
		value = string;
	} else {
		// uses the number value in endIndex as the endpoint of the slice method
		value = string.slice(0, endIndex);
	}

	return value;
};



exports.getWeatherIcon = function(weatherCode, iconCode) {
	var fileName;

	/** Weather codes
	* Thundertorm: 200 - 232
	* Drizzle: 300 - 321
	* Rain: 500 - 531
	* Snow: 600 - 622
	* Crazy Atmosphere conditions: 701 - 781
	* Clouds/Sky: 800 - 804
	* Extreme conditions: 900 - 906
	* Extra: 951 - 962
	*/

	if (weatherCode === 200 || weatherCode < 233) {
		return 'storm';
	} else if (weatherCode === 300 || weatherCode < 322) {
		return 'light_rain';
	} else if (weatherCode === 500 || weatherCode < 532) {
		return 'rain';
	} else if (weatherCode === 600 || weatherCode < 623) {
		return 'snow';
	} else if (weatherCode < 742) {
		if (isNightTime(iconCode)) {
			return 'fog_night';
		} else {
			return 'fog_day';
		}
	} else if (weatherCode < 782) {
		return 'dry';
	} else if (weatherCode === 800) {
		if (isNightTime(iconCode)) {
			return 'bright_moon';
		} else {
			return 'sun';
		}
	} else if (weatherCode === 801) {
		if (isNightTime(iconCode)) {
			return 'partly_cloudy_night';
		} else {
			return 'partly_cloudy_day';
		}
	} else if (weatherCode < 805) {
		if (isNightTime(iconCode)) {
			return 'partly_cloudy_night';
		} else {
			return 'partly_cloudy_day';
		}
	} else if (weatherCode === 900) {
		return 'tornado';
	} else if (weatherCode < 903) {
		return 'wet';
	} else if (weatherCode === 903) {
		return 'icy';
	} else if (weatherCode === 904) {
		return 'dry';
	} else if (weatherCode === 905) {
		return 'wind_gauge';
	} else if (weatherCode === 906) {
		return 'hail';
	}
};
