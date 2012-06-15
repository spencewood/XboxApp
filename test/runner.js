requirejs.config({
	paths: {
		app: '../scripts'
	}
});

define(['mocha/mocha', 'app/lib/spine/spine', 'app/lib/spine/ajax'], function(){
	mocha.setup('bdd');

	require(['games.tests', 'votes.tests', 'service.tests'], function(){
		mocha.run();
	});
});