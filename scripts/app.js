requirejs.config({
	paths: {
		app: '.'
	}
});

require(['controllers/games'], function($){
	alert('loaded');
});