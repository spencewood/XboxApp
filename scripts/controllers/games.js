define(['jquery', 'app/models/game', 'app/helpers/sort', 'app/lib/spine/spine'], 
	function($, Game, sort){
		var Games = Spine.Controller.sub({
			init: function(){
				Game.bind('refresh', function(){
					alert('refreshed');
				});
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes'));
			}
		});

		return Games;
	}
);