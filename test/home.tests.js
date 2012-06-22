define(['app/controllers/Home',
	'app/controllers/Games',
	'app/controllers/GameTitle',
	'app/controllers/dailies',
	'app/models/game',
	'app/models/daily',
	'app/helpers/date',
	'app/settings',
	'expect/expect',
	'sinon/sinon'],
	function(Home, Games, GameTitle, Dailies, Game, Daily, datetool, settings){
		describe('Home', function(){
			before(function(){
				Daily.deleteAll();
				Game.deleteAll();
			});

			afterEach(function(done){
				Game.deleteAll();
				Daily.deleteAll();
				done();
			});

			it('does not allow duplicate titles', function(){
				var addAGame = function(){
					return Home.addGame('test game', {disableAjax: true});
				};

				//add a game
				expect(addAGame()).to.be(true);
				//clear our daily allowance
				Daily.deleteAll();

				//try to add a game with the same title
				expect(addAGame()).to.be(false);
			});

			it('only allows adding one game title per day', function(){
				var addAGame = function(){
					return Home.addGame('test game', {disableAjax: true});
				};

				//add a game
				addAGame();

				//add a game
				expect(addAGame()).to.be(false);
			});

			it('will not allow adding of game title if a vote has been made', function(){
				Dailies.setToday();

				expect(Home.addGame('test game', {disableAjax: true})).to.be(false);
			});

			it('is able to clear all games', function(){
				new Game({title: 'test game', owned: true}).save({disableAjax: true});

				Home.clear({disableAjax: true});

				expect(Games.getOwned().length).to.be(0);
			});

			it('does not allow games with blank titles to be added', function(){
				expect(new Game({title: ''}).save({disableAjax: true})).to.be(false);
			});

			it('does not allow just spaces to be added as a game title', function(){
				expect(new Game({title: '    '}).save({disableAjax: true})).to.be(false);
			});
		});
	}
);