define(['app/controllers/votes', 'expect/expect', 'sinon/sinon'],
	function(Votes){
		describe('Votes', function(){
			var v = null;
			beforeEach(function(done){
				v = new Votes();
				done();
			});


			it('returns the current date when calling getDate', function(){
				expect(v.getDate().getDay()).to.be(new Date().getDay());
			});

			it('can vote on Monday', function(){
				//stub getDate function to return a fake date
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-02-2012'); //a Monday
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Tuesday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-03-2012'); //a Tuesday
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Wednesday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-04-2012'); //a Wednesday
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Thursday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-05-2012'); //a Thursday
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('can vote on Friday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-06-2012'); //a Friday
				});
				expect(v.canVote()).to.be(true);
				stub.restore();
			});

			it('cannot vote on Saturday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-07-2012'); //a Saturday
				});
				expect(v.canVote()).to.be(false);
				stub.restore();
			});

			it('cannot vote on Sunday', function(){
				var stub = sinon.stub(v, 'getDate', function(){
					return new Date('01-01-2012'); //a Sunday
				});
				expect(v.canVote()).to.be(false);
				stub.restore();
			});

			it('only allows one vote per day', function(){
				throw 'not implemented';
			});

			it('will not allow a vote if a game has been added today', function(){
				throw 'not implemented';
			});
		})
	}
);