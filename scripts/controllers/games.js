define(['jquery', 'app/models/game', 'app/lib/spine/spine'], 
	function($, Game){
		var Games = Spine.Controller.sub({
			init: function(){
				Game.bind('refresh', function(){
					alert('refreshed');
				});
			}
		});



		return Games;
	}
);