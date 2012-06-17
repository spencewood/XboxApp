define(['app/controllers/votes',
	'app/controllers/dailies',
	'app/models/daily',
	'app/helpers/date',
	'expect/expect',
	'sinon/sinon'],
	function(Votes, Dailies, Daily, dateTool){
		describe('Votes', function(){
			var v = null;
			beforeEach(function(done){
				v = new Votes();
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

			it('returns the current day when calling getDate', function(){
				expect(v.getDate().getDay()).to.be(new Date().getDay());
			});

			it('can vote on Monday', function(){
				//stub getDate function to return a fake date
				var stub = sinon.stub(v, 'getDate', function(){
					return monday;
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Tuesday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return tuesday;
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Wednesday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return wednesday;
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Thursday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return thursday;
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Friday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return friday;
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('cannot vote on Saturday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return saturday;
				});
				expect(v.canVote()).to.be(false);
				stub.restore();
			});

			it('cannot vote on Sunday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return sunday;
				});
				expect(v.canVote()).to.be(false);
				stub.restore();
			});

			it('is able to vote when it is a voting day and we have not reached our daily limit', function(){
				//stub our day to a voting day
				var stub = sinon.stub(v, 'getDate', function(){
					return monday;
				});

				//setup spy here

				expect(v.vote(1)).to.be.ok();
				stub.restore();
			});

			it('cannot vote when daily limit has been reached', function(){
				//stub our day to a voting day for voting check only
				var stub = sinon.stub(v, 'getDate', function(){
					return monday;
				});
				//we have already voted or added a game today
				//will not correspond with stubbed day -- not testing that
				//new Daily({day: dateTool.getFormattedString()}).save();
				Dailies.setToday();

				expect(v.vote()).to.be(false);
				stub.restore();
			});

			it('sets daily token when vote is made', function(){
				//stub our day to a voting day
				var stub = sinon.stub(v, 'getDate', function(){
					return monday;
				});
				//stub for ajax call -- just calls callback immediately
				var ajaxStub = sinon.stub(v, '_ajaxVote', function(id, cb){
					cb();
				});

				v.vote(1);
				expect(Dailies.isOpen()).to.be(false);
				stub.restore();
				ajaxStub.restore();
			});
		});
	}
);