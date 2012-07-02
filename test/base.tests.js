define(['controllers/_rulebase',
	'controllers/dailies',
	'models/daily',
	'models/adminsetting',
	'helpers/date',
	'expect',
	'sinon'],
	function(Base, Dailies, Daily, AdminSetting, dateTool){
		describe('Application', function(){
			
			describe('Voting rules', function(){
				var t = null;
				beforeEach(function(done){
					t = new Base();
					Daily.deleteAll();
					AdminSetting.destroyAll();
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
					expect(t.getDate().getDay()).to.be(new Date().getDay());
				});

				it('can vote on Monday', function(){
					//stub getDate function to return a fake date
					var stub = sinon.stub(t, 'getDate', function(){
						return monday;
					});
					expect(t.canVote()).to.be(true);
					stub.restore();
				});

				it('can vote on Tuesday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return tuesday;
					});
					expect(t.canVote()).to.be(true);
					stub.restore();
				});

				it('can vote on Wednesday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return wednesday;
					});
					expect(t.canVote()).to.be(true);
					stub.restore();
				});

				it('can vote on Thursday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return thursday;
					});
					expect(t.canVote()).to.be(true);
					stub.restore();
				});

				it('can vote on Friday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return friday;
					});
					expect(t.canVote()).to.be(true);
					stub.restore();
				});

				it('cannot vote on Saturday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return saturday;
					});
					expect(t.canVote()).to.be(false);
					stub.restore();
				});

				it('cannot vote on Sunday', function(){
					var stub = sinon.stub(t, 'getDate', function(){
						return sunday;
					});
					expect(t.canVote()).to.be(false);
					stub.restore();
				});
			});
		});
	}
);