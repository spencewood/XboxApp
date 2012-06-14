requirejs.config({
	paths: {
		app: '../scripts'
	}
});

define(['mocha/mocha'], function(){
	mocha.setup('bdd');

	require(['games.tests'], function(){
		mocha.run();
	});
});