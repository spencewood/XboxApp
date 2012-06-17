define(['app/models/daily',
 'app/models/game',
 'app/helpers/date',
 'app/lib/spine/spine'],
	function(Daily, Game, dateTool){
		var Dailies = Spine.Controller.sub({
			init: function(){
				//subscribe to a Game's create event and set or daily
				Game.bind('create', Dailies.setToday);
			}
		});

		//static methods
		Dailies.isOpen = function(){
			var daily = Daily.findByAttribute('day', dateTool.getFormattedString());
			return daily === null;
		};

		Dailies.setToday = function(){
			if(Dailies.isOpen()){
				new Daily({day: dateTool.getFormattedString(), added: new Date()}).save();
			}
		};

		Dailies.clear = function(){
			Daily.deleteAll();
		};

		return Dailies;
	}
);