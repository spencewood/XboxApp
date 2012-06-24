requirejs.config({
	paths: {
		app: '.'
	}
});

require(['controllers/home',
	'controllers/games',
	'lib/handlebars',
	'lib/spine/spine',
	'lib/bootstrap'],
	function(Home, Games){
		Games.fetch();
	}
);
