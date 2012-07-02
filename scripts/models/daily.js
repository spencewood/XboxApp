define(['lib/spine/spine',
	'lib/spine/ajax',
	'lib/spine/local'],
	function(){
		var Daily = Spine.Model.sub();
		Daily.configure('Daily', 'day', 'added');
		Daily.extend(Spine.Model.Local);

		return Daily;
	}
);