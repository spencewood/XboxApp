define(['app/controllers/Admin',
	'app/controllers/Games',
	'app/controllers/GameTitle',
	'app/controllers/dailies',
	'app/models/game',
	'app/models/daily',
	'app/models/adminsetting',
	'app/helpers/date',
	'app/settings',
	'expect/expect',
	'sinon/sinon'],
	function(Admin, Games, GameTitle, Dailies, Game, Daily, AdminSetting, datetool, settings){
		describe('Admin', function(){
			var adminController = null,
				gamesController = null;
			before(function(){
				adminController = new Admin();
				gamesController = new Games();
			});

			beforeEach(function(){
				AdminSetting.deleteAll();
				Daily.deleteAll();
				Game.deleteAll();
			});

			it('is able to clear all games', function(){
				new Game({title: 'test game', owned: true}).save({disableAjax: true});

				adminController.clearGames({disableAjax: true});

				expect(gamesController.getOwned().length).to.be(0);
			});

			it('is able to clear daily token', function(){
				new Game({title: 'test game', owned: true}).save({disableAjax: true});
				adminController.clearDaily();
				new Game({title: 'test game 2', owned: true}).save({disableAjax: true});
				expect(Game.all().length).to.be(2);
			});
		});
	}
);