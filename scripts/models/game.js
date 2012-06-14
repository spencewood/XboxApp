define(['app/lib/spine/spine'],
	function(){
		var Game = Spine.Model.sub();
		Game.configure('Game', 'id', 'api_id', 'title', 'votes', 'owned');

		return Game;
	}
);