define(['app/lib/spine/spine', 'app/lib/spine/ajax', 'app/lib/spine/local'],
	function(){
		var Daily = Spine.Model.sub();
		Daily.configure('Daily', 'day', 'added');
		Daily.extend(Spine.Model.Local);

		return Daily;
	}
);