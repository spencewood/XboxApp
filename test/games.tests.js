define(['controllers/games',
	'controllers/GameTitle',
	'controllers/dailies',
	'controllers/home',
	'controllers/_rulebase',
	'models/game',
	'models/daily',
	'models/adminsetting',
	'helpers/date',
	'settings',
	'expect',
	'sinon'],
	function(Games, GameTitle, Dailies, Home, Base, Game, Daily, AdminSetting, datetool, settings){
		describe('Games', function(){
			//setup two games for testing most actions
			var ownedGame = new Game({title: 'Owned', votes: 2, owned: true});
			var unownedGame = new Game({title: 'UnOwned', votes: 2, owned: false});
			var server = sinon.fakeServer.create();

			before(function(){
				Game.unbind('addnewgame');
			});

			describe('Model', function(){
				beforeEach(function(){
					Game.deleteAll();
				});

				afterEach(function(){
					server.restore();
				});

				it('returns all games when requesting all', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.all().length).to.be(2);
				});

				it('supports find all by attribute', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.findAllByAttribute('votes', 2).length).to.be(2);
				});

				it('returns games with correct vote value', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.first().votes).to.be(2);
				});

				it('returns the model when saving', function(){
					expect(ownedGame.save({disableAjax: true})).to.not.be(null);
				});

				it('scrubs game data after coming back from service', function(){
					//fill out
				});
			});

			describe('Controller', function(){
				var controller = null;

				beforeEach(function(){
					controller = new Games();
					Game.unbind('addnewgame');
					Game.deleteAll();
					Daily.deleteAll();
					AdminSetting.deleteAll();
				});

				afterEach(function(done){
					server.restore();
					done();
				});

				it('sets daily marker after successful game addition', function(done){
					//bind test event
					Game.one('create', function(){
						expect(Dailies.isOpen()).to.be(false);
						done();
					});

					var stub = sinon.stub(Base.prototype, 'canVote', function(){
						return true;
					});
					ownedGame.save({disableAjax: true});

					stub.restore();
				});

				it('returns only owned games when getting owned games', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});

					expect(controller.getOwned().length).to.be(1);
					expect(controller.getOwned()[0].toJSON()).to.have.key('title');
					expect(controller.getOwned()[0].toJSON().title).to.be('Owned');
				});

				it('returns only unowned (wanted) games when getting unowned games', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});

					expect(controller.getUnowned().length).to.be(1);
					expect(controller.getUnowned()[0].toJSON()).to.have.key('title');
					expect(controller.getUnowned()[0].toJSON().title).to.be('UnOwned');
				});

				it('returns wanted games in descending order by vote count', function(){
					//add some unowned games
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					new Game({title: 'a', votes: 1, owned: false}).save({disableAjax: true});
					new Game({title: 'b', votes: 50, owned: false}).save({disableAjax: true});
					new Game({title: 'c', votes: 15, owned: false}).save({disableAjax: true});
					new Game({title: 'd', votes: 7, owned: false}).save({disableAjax: true});
					
					var unowned = controller.getUnowned();

					expect(unowned[0].votes).to.be(50);
					expect(unowned[unowned.length-1].votes).to.be(1);
				});

				it('returns owned games in alpha order', function(){
					//add some owned games
					new Game({title: 'z', owned: true}).save({disableAjax: true});
					new Game({title: 'ab', owned: true}).save({disableAjax: true});
					new Game({title: 'a', owned: true}).save({disableAjax: true});
					new Game({title: 'AB', owned: true}).save({disableAjax: true});

					var owned = controller.getOwned();

					expect(owned[0].title).to.be('a');
					expect(owned[owned.length-1].title).to.be('z');
				});
				
				it('calls the addOne rendering for all viewable games', function(){
					sinon.spy(controller, 'addOne');
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.all().length).to.be(2);
					controller.addSelected();
					expect(controller.addOne.called).to.be(true);
				});

				it('sets daily token when vote is made', function(done){
					Game.one('vote', function(){
						expect(Dailies.isOpen()).to.be(false);
						done();
					});

					var stub = sinon.stub(Base.prototype, 'canVote', function(){
						return true;
					});

					var game = new Game({title: 'a'});
					game.save({disableAjax: true})
					game.vote({disableAjax:true});

					stub.restore();
				});

				//need to test on getting the games list again after adding one since we have no initial id
			});
		});
	}
);