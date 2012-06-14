define(['app/controllers/games', 'app/models/game', 'expect/expect'],
	function(Games, Game){
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

				beforeEach(function(done){
					Spine.Ajax.disable(function() {
						ownedGame.save();
						unownedGame.save();
						done();
					});
				});

				afterEach(function(done){
					Game.deleteAll();
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
					//add some new games
					Spine.Ajax.disable(function(){
						new Game({votes: 1, owned: false}).save();
						new Game({votes: 50, owned: false}).save();
						new Game({votes: 15, owned: false}).save();
						new Game({votes: 7, owned: false}).save();
					});
					console.log(g.getUnowned());
					expect(g.getUnowned()[0].votes).to.be(1);
				});
			});
		});
	}
);