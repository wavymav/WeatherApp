// This eventConfig file is ment to prevent me from using magic strings!
// Very usefull for the EventEmitter
// Helps prevent typos!

// events object holds the events

// templateViews object holds the template view file names

 module.exports = {
	 events: {
		 DATA: 'data',
		 END: 'end',
		 ERROR: 'error'
	 },
   templateViews: {
     ERROR: 'errorContainer',
     FOOTER: 'footer',
     HEADER: 'header',
     HEADSEARCH: 'headSearchContainer',
     SEARCH: 'searchContainer',
     WEATHER: 'weatherReportContainer'
   }
 };
