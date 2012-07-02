define(['controllers/home',
	'controllers/games',
	'controllers/admin',
	'controllers/gametitle',
	'controllers/dailies',
	'models/daily',
	'models/game',
	'models/adminsetting',
	'helpers/date',
	'expect',
	'sinon'],
	function(Home, Games, Admin, GameTitle, Dailies, Daily, Game, AdminSetting, dateTool){
		describe('Integration', function(){
			var title = null,
				game = new Game({title: 'test game', owned: true}).save({disableAjax: true}),
				homeController = null,
				gamesController = null,
				adminController = null;

			before(function(){
				//stub a weekday to get through tests
				sinon.stub(Home.prototype, 'getDate', function(){
					return new Date('1-2-2012'); //Monday
				});
			});

			beforeEach(function(){
				homeController = new Home();
				gamesController = new Games();
				adminController = new Admin();
				Game.unbind('addnewgame');
				AdminSetting.deleteAll();
				homeController.addGame('test game', {disableAjax: true});
				gamesController.show = 'all';
				gamesController.addSelected();
			});

			afterEach(function(){
				Game.deleteAll();
				Daily.deleteAll();
				//$('#games tbody').empty();
			});

			it('adds correct number of games to the page', function(){
				expect($('#games tbody').find('tr').size()).to.be(1);
			});

			it('cleans up the games list before adding new ones', function(){
				$('#games tbody').append($('<tr>', {text: 'test'})).append($('<tr>', {text: 'test'}));
				gamesController.addSelected();
				gamesController.addSelected();
				expect($('#games tbody tr.game').size()).to.be(1);
			});

			it('sets vote when clicking on vote button for this game', function(){
				var spy = sinon.spy(GameTitle.prototype, 'voteEvent');
				var stub = sinon.stub(GameTitle.prototype, 'vote', function(){});
				$('#games tbody tr:first .vote-action').click();
				expect(GameTitle.prototype.voteEvent.called).to.be(true);
				stub.restore();
			});

			it('calls setOwnedEvent when clicking on the owned button for this game', function(){
				var spy = sinon.spy(GameTitle.prototype, 'setOwnedEvent');
				var stub = sinon.stub(GameTitle.prototype, 'setOwned', function(){});
				$('#games tbody tr:first .owned-action').click();
				expect(GameTitle.prototype.setOwnedEvent.called).to.be(true);
				stub.restore();
			});

			it('submits the game when the submit button is pressed', function(){
				var spy = sinon.spy(homeController, 'addGameEvent');
				$('#addGame').val('test game');
				$('#submitAddGame').click();
				expect(homeController.addGameEvent.called).to.be(true);
			});

			it('shows an error on the screen if validation fails', function(){
				$('#submitAddGame').click();
				expect($("#message").text().length > 0);
			});
		});
	}
);