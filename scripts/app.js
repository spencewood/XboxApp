requirejs.config({
	paths: {
		app: '.'
	}
});

require(['jquery',
	'controllers/games',
	'controllers/home',
	'lib/spine/spine',
	'lib/bootstrap'],
	function($, Games, Home){
		Games.fetch();
	}
);
