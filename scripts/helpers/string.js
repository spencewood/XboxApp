/*
 * String functions
 */

define(function(){
	return {
		ucFirst: function(str){
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	};
});