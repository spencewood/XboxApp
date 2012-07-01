requirejs.config({
	paths: {
		app: '../scripts'
	}
});

define(['mocha/mocha', 'app/lib/spine/spine', 'app/lib/spine/ajax'], function(){
	mocha.setup('bdd');

	require([
		'home.tests',
		'admin.tests',
		'base.tests',
		'games.tests',
		'gametitle.tests',
		'daily.tests',
		'integration.tests',
		'helper.tests'
		//'service.tests'
		], function(){
		mocha.run();
	});
});