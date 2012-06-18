define(['app/controllers/gametitles',
	'app/controllers/dailies',
	'app/models/daily',
	'app/models/game',
	'app/helpers/date',
	'expect/expect',
	'sinon/sinon'],
	function(GameTitles, Dailies, Daily, Game, dateTool){
		describe('Game Titles', function(){
			it('contains the model item for an individual game', function(){
				var model = new Game({title: 'test game'});
				var controller = new GameTitles({item: model});
				expect(controller.item).to.be(model);
			});

			it('throws exception when instatiated without an item context', function(done){
				try{
					new GameTitles();
				}catch(e){
					done();
				}
			});

			describe('Voting', function(){
				var t = null;
				beforeEach(function(done){
					t = new GameTitles({item: new Game({title: 'game', owned: false})});
					Daily.deleteAll();
					done();
				});

				var monday = new Date('01-02-2012'); //a Monday
				var tuesday = new Date('01-03-2012'); //a Tuesday
				var wednesday = new Date('01-04-2012'); //a Wednesday
				var thursday = new Date('01-05-2012'); //a Thursday
				var friday = new Date('01-06-2012'); //a Friday
				var saturday = new Date('01-07-2012'); //a Saturday
				var sunday = new Date('01-01-2012'); //a Sunday

				it('is able to vote when it is a voting day and we have not reached our daily limit', function(){
					//stub our day to a voting day
					var stub = sinon.stub(t, 'getDate', function(){
						return monday;
					});

					//setup spy here

					expect(t.vote({disableAjax: true})).to.be.ok();
					stub.restore();
				});

				it('cannot vote when daily limit has been reached', function(){
					//stub our day to a voting day for voting check only
					var stub = sinon.stub(t, 'getDate', function(){
						return monday;
					});
					//we have already voted or added a game today
					//will not correspond with stubbed day -- not testing that
					Dailies.setToday();

					expect(t.vote()).to.be(false);
					stub.restore();
				});

				it('triggers the vote event when a vote is made', function(){
					Game.bind('vote', function(d){
						expect(d).to.not.be(null);
					});
					t.vote();
				});

				it('is able to set a game as owned', function(){
					t.setOwned({disableAjax: true});
					expect(t.item.owned).to.be(true);
				});
			});
		});
	}
);