define(['controllers/home',
	'controllers/games',
	'controllers/gametitle',
	'controllers/dailies',
	'models/game',
	'models/daily',
	'models/adminsetting',
	'helpers/date',
	'settings',
	'expect',
	'sinon'],
	function(Home, Games, GameTitle, Dailies, Game, Daily, AdminSetting, datetool, settings){
		describe('Home', function(){
			var homeController = null;
			before(function(){
				homeController = new Home();
				//stub a weekday to get through tests
				sinon.stub(Home.prototype, 'getDate', function(){
					return new Date('1-2-2012'); //Monday
				});
				Game.unbind('addnewgame');
			});

			beforeEach(function(){
				AdminSetting.deleteAll();
				Daily.deleteAll();
				Game.deleteAll();
			});

			it('does not allow duplicate titles', function(){
				var addAGame = function(){
					return homeController.addGame('test game', {disableAjax: true});
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
					return homeController.addGame('test game', {disableAjax: true});
				};

				//add a game
				addAGame();

				//add a game
				expect(addAGame()).to.be(false);
			});

			it('will not allow adding of game title if a vote has been made', function(){
				homeController.addGame('test game', {disableAjax: true});

				expect(homeController.addGame('test game', {disableAjax: true})).to.be(false);
			});

			it('does not allow games with blank titles to be added', function(){
				expect(homeController.addGame('')).to.be(false);
			});

			it('does not allow just spaces to be added as a game title', function(){
				expect(homeController.addGame('      ')).to.be(false);
			});
		});
	}
);