define(['app/controllers/games',
	'app/controllers/GameTitle',
	'app/controllers/dailies',
	'app/controllers/home',
	'app/controllers/_rulebase',
	'app/models/game',
	'app/models/daily',
	'app/helpers/date',
	'app/settings',
	'expect/expect',
	'sinon/sinon'],
	function(Games, GameTitle, Dailies, Home, Base, Game, Daily, datetool, settings){
		describe('Games', function(){
			//setup two games for testing most actions
			var ownedGame = new Game({title: 'Owned', votes: 2, owned: true});
			var unownedGame = new Game({title: 'UnOwned', votes: 2, owned: false});
			var server = sinon.fakeServer.create();

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
					ownedGame.save( {disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.findAllByAttribute('votes', 2).length).to.be(2);
				});

				it('returns games with correct vote value', function(){
					ownedGame.save( {disableAjax: true});
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
				var g = new Games({el: "#games"}),
					h = new Home({el: 'body'});

				before(function(){
					//contructor contains event binding for daily
					new Dailies();
				});

				afterEach(function(done){
					server.restore();
					Game.deleteAll();
					Daily.deleteAll();
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

					new Game().save({disableAjax: true});

					stub.restore();
				});

				it('returns only owned games when getting owned games', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});

					expect(g.getOwned().length).to.be(1);
					expect(g.getOwned()[0].toJSON()).to.have.key('title');
					expect(g.getOwned()[0].toJSON().title).to.be('Owned');
				});

				it('returns only unowned (wanted) games when getting unowned games', function(){
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});

					expect(g.getUnowned().length).to.be(1);
					expect(g.getUnowned()[0].toJSON()).to.have.key('title');
					expect(g.getUnowned()[0].toJSON().title).to.be('UnOwned');
				});

				it('returns wanted games in descending order by vote count', function(){
					//add some unowned games
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					new Game({votes: 1, owned: false}).save({disableAjax: true});
					new Game({votes: 50, owned: false}).save({disableAjax: true});
					new Game({votes: 15, owned: false}).save({disableAjax: true});
					new Game({votes: 7, owned: false}).save({disableAjax: true});
					
					var unowned = g.getUnowned();

					expect(unowned[0].votes).to.be(1);
					expect(unowned[unowned.length-1].votes).to.be(50);
				});

				it('returns owned games in alpha order', function(){
					//add some owned games
					new Game({title: 'z', owned: true}).save({disableAjax: true});
					new Game({title: 'ab', owned: true}).save({disableAjax: true});
					new Game({title: 'a', owned: true}).save({disableAjax: true});
					new Game({title: 'AB', owned: true}).save({disableAjax: true});

					var owned = g.getOwned();

					expect(owned[0].title).to.be('a');
					expect(owned[owned.length-1].title).to.be('z');
				});

				it('sets daily token when vote is made', function(done){
					Game.one('vote', function(){
						expect(Dailies.isOpen()).to.be(false);
						done();
					});

					var stub = sinon.stub(Base.prototype, 'canVote', function(){
						return true;
					});

					new Game().vote({disableAjax:true});

					stub.restore();
				});

				it('calls the addOne rendering for all viewable games', function(){
					sinon.spy(g, 'addOne');
					ownedGame.save({disableAjax: true});
					unownedGame.save({disableAjax: true});
					expect(Game.all().length).to.be(2);
					g.addSelected();
					expect(g.addOne.calledTwice).to.be(true);
				});
			});
		});
	}
);