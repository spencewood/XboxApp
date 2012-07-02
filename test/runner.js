requirejs.config({
	baseUrl: '../scripts',
	paths:{
		test: '../test',
		mocha: '../test/mocha/mocha',
		expect: '../test/expect/expect',
		sinon: '../test/sinon/sinon'
	}
});

require(['mocha', 'lib/spine/spine', 'lib/spine/ajax'], function(){
	mocha.setup('bdd');

	require([
		'test/home.tests',
		'test/admin.tests',
		'test/base.tests',
		'test/games.tests',
		'test/gametitle.tests',
		'test/daily.tests',
		'test/integration.tests',
		'test/helper.tests',
		'test/service.tests'
		], function(){
		mocha.run();
	});
});