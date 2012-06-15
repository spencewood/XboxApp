define(function(){
	var toLowerIfString = function(str){
		if(typeof str === 'string'){
			return str.toLowerCase();
		}
		return str;
	};

	return {
		byProperty: function(property){
			return function(a,b){
				var propertyA = toLowerIfString(a[property]),
					propertyB = toLowerIfString(b[property]);


				if(propertyA < propertyB){
					return -1;
				}
				if(propertyA > propertyB){
					return 1;
				}
				return 0;
			}
		}
	};
});