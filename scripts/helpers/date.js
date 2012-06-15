define(function(){
	return {
		getFormattedString: function(date){
			return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('-');
		}
	}
});