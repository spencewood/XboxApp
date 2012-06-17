define(['app/controllers/gametitles',
	'app/controllers/dailies',
	'app/models/daily',
	'app/helpers/date',
	'expect/expect',
	'sinon/sinon'],
	function(GameTitles, Dailies, Daily, dateTool){
		describe('Game Titles', function(){
			describe('Voting', function(){
				var t = null;
				beforeEach(function(done){
					t = new GameTitles();
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

					expect(t.vote(1)).to.be.ok();
					stub.restore();
				});

				it('cannot vote when daily limit has been reached', function(){
					//stub our day to a voting day for voting check only
					var stub = sinon.stub(t, 'getDate', function(){
						return monday;
					});
					//we have already voted or added a game today
					//will not correspond with stubbed day -- not testing that
					//new Daily({day: dateTool.getFormattedString()}).save();
					Dailies.setToday();

					expect(t.vote()).to.be(false);
					stub.restore();
				});

				it('sets daily token when vote is made', function(){
					//stub our day to a voting day
					var stub = sinon.stub(t, 'getDate', function(){
						return monday;
					});
					//stub for ajax call -- just calls callback immediately
					var ajaxStub = sinon.stub(t, '_ajaxVote', function(id, cb){
						cb();
					});

					t.vote(1);
					expect(Dailies.isOpen()).to.be(false);
					stub.restore();
					ajaxStub.restore();
				});
			});
		});
	}
);