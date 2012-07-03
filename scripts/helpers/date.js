/*
 * Misc Date functions
 */

define(function(){
	return {
		//used for consistent date format for use in local storage
		getFormattedString: function(date){
			date = date || new Date();
			return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-');
		},

		//this exists entirely for testing purposes
		getDate: function(){
			return new Date();
		}
	};
});