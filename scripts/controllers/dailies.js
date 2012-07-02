define(['models/daily',
 'models/game',
 'models/adminsetting',
 'helpers/date',
 'lib/spine/spine'],
	function(Daily, Game, AdminSetting, dateTool){
		var Dailies = Spine.Controller.sub();
		Daily.fetch();
		//static
		Dailies.extend({
			isOpen: function(){
				if(AdminSetting.findByAttribute('setting','votedaily')){
					return true;
				}
				var daily = Daily.findByAttribute('day', dateTool.getFormattedString());
				return daily === null;
			},

			validate: function(){
				return Dailies.isOpen() ? '' : 'Cannot vote or add a game more than once a day';
			},

			setToday: function(){
				if(Dailies.isOpen()){
					new Daily({day: dateTool.getFormattedString(), added: new Date()}).save();
				}
			},

			clear: function(){
				Daily.deleteAll();
			},

			fetch: function(){
				return Daily.fetch();
			}
		});

		return Dailies;
	}
);