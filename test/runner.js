requirejs.config({
	paths: {
		app: '../scripts'
	}
});

define(['mocha/mocha', 'app/lib/spine/spine', 'app/lib/spine/ajax'], function(){
	mocha.setup('bdd');

	require(['base.tests', 'games.tests', 'gametitles.tests', 'daily.tests', 'service.tests', 'helper.tests'], function(){
		mocha.run();
	});
});