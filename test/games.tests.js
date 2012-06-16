define(['app/controllers/games',
	'app/controllers/dailies',
	'app/models/game',
	'app/models/daily',
	'app/helpers/date',
	'expect/expect'],
	function(Games, Dailies, Game, Daily, datetool){
		describe('Games', function(){
			//setup two games for testing most actions
			var ownedGame = new Game({title: 'Owned', votes: 2, owned: true});
			var unownedGame = new Game({title: 'UnOwned', votes: 2, owned: false});

			describe('Model', function(){
				before(function(done){
					Spine.Ajax.disable(function() {
						ownedGame.save();
						unownedGame.save();
						done();
					});
				});

				it('returns all games when requesting all', function(){
					expect(Game.all().length).to.be(2);
				});

				it('supports find all by attribute', function(){
					expect(Game.findAllByAttribute('votes', 2).length).to.be(2);
				});

				it('returns games with correct vote value', function(){
					expect(Game.first().votes).to.be(2);
				});
			});

			describe('Controller', function(){
				var g = new Games();

				before(function(){
					//contructor contains event binding for daily
					new Dailies();
				});

				beforeEach(function(done){
					Spine.Ajax.disable(function() {
						ownedGame.save();
						unownedGame.save();
						done();
					});
				});

				afterEach(function(done){
					Game.deleteAll();
					Daily.deleteAll();
					done();
				});

				it('returns only owned games when getting owned games', function(){
					expect(g.getOwned().length).to.be(1);
					expect(g.getOwned()[0].toJSON()).to.have.key('title');
					expect(g.getOwned()[0].toJSON().title).to.be('Owned');
				});

				it('returns only unowned (wanted) games when getting unowned games', function(){
					expect(g.getUnowned().length).to.be(1);
					expect(g.getUnowned()[0].toJSON()).to.have.key('title');
					expect(g.getUnowned()[0].toJSON().title).to.be('UnOwned');
				});

				it('returns wanted games in descending order by vote count', function(){
					//add some unowned games
					Spine.Ajax.disable(function(){
						new Game({votes: 1, owned: false}).save();
						new Game({votes: 50, owned: false}).save();
						new Game({votes: 15, owned: false}).save();
						new Game({votes: 7, owned: false}).save();
					});
					
					var unowned = g.getUnowned();

					expect(unowned[0].votes).to.be(1);
					expect(unowned[unowned.length-1].votes).to.be(50);
				});

				it('returns owned games in alpha order', function(){
					//add some owned games
					Spine.Ajax.disable(function(){
						new Game({title: 'z', owned: true}).save();
						new Game({title: 'ab', owned: true}).save();
						new Game({title: 'a', owned: true}).save();
						new Game({title: 'AB', owned: true}).save();
					});

					var owned = g.getOwned();

					expect(owned[0].title).to.be('a');
					expect(owned[owned.length-1].title).to.be('z');
				});

				it('sets daily marker after successful game addition', function(done){
					//bind test event
					Game.one('create', function(){
						var today = new Date();
						expect(Dailies.open()).to.be(false);
						done();
					});

					Spine.Ajax.disable(function(){
						new Games().add('test game');
					});
				});

				it('does not allow duplicate titles', function(){
					var addAGame = function(){
						return g.add('test game');
					};

					//add a game
					Spine.Ajax.disable(function(){
						addAGame();
					});
					//clear our daily allowance
					Daily.deleteAll();

					//try to add a game with the same title
					Spine.Ajax.disable(function(){
						expect(addAGame()).to.be(false);
					});
				});

				it('only allows adding one game title per day', function(){
					var addAGame = function(){
						return g.add('test game');
					};

					//add a game
					Spine.Ajax.disable(function(){
						addAGame();
					});

					//add a game
					Spine.Ajax.disable(function(){
						expect(addAGame()).to.be(false);
					});
				});

				it('will not allow adding of game title if a vote has been made', function(){
					Dailies.setToday();

					expect(g.add('test game')).to.be(false);
				});

				it('can mark a game as owned', function(){
					throw 'not implemented';
				});
			});
		});
	}
);