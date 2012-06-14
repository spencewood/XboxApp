define(['jquery', 'app/models/game', 'app/lib/spine/spine'], 
	function($, Game){
		var Games = Spine.Controller.sub({
			init: function(){
				Game.bind('refresh', function(){
					alert('refreshed');
				});
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true);
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false);
			}
		});



		return Games;
	}
);