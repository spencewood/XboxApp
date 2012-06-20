requirejs.config({
	paths: {
		app: '.'
	}
});

require(['jquery',
	'controllers/games',
	'controllers/home',
	'models/game',
	'lib/spine/spine',
	'lib/bootstrap'],
	function($, Games, Home, Game){
		new Games({el: $('#games')});
		new Home({el: $('body')});
	}
);