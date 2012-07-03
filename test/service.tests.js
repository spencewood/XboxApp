define(['settings',
	'expect',
	'mocha'],
	function(settings){
		describe('Service', function(){
			var games = [], //used to get the results back for some tests
				getGameId = function(){
					if(games.length){
						return games[0].id;
					}
				};
			//let's test the service to make sure it does what it's supposed to

			//we are going to use jsonp with the snazzy jquery callback handler
			
			describe('checkkey', function(){
				it('returns FALSE on an invalid key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/checkkey',
						dataType: 'jsonp',
						data: {
							apiKey: 'InVaLiDaPiKeY!'
						},
						success: function(d){
							expect(d).to.be(false);
							done();
						}
					});
				});

				it('returns true on a valid key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/checkkey',
						dataType: 'jsonp',
						data: {
							apiKey: settings.apiKey
						},
						success: function(d){
							expect(d).to.be(true);
							done();
						}
					});
				});
			});

			describe('addnewgame', function(){
				it('returns FALSE on invalid api key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/addnewgame',
						dataType: 'jsonp',
						data:{
							apiKey: 'InVaLiDaPiKeY!',
							title: 'test game'
						},
						success: function(d){
							expect(d).to.be(false);
							done();
						}
					});
				});

				it('returns TRUE on successful addition of game', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/addnewgame',
						dataType: 'jsonp',
						data:{
							apiKey: settings.apiKey,
							title: 'test game'
						},
						success: function(d){
							expect(d).to.be(true);
							done();
						}
					});
				});
			});

			describe('getgames', function(){
				it('returns FALSE on invalid key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/getgames',
						dataType: 'jsonp',
						data: {
							apiKey: 'InVaLiDaPiKeY!'
						},
						success: function(d){
							expect(d).to.be(false); //seems to be returning []
							done();
						}
					});
				});

				it('returns an array of objects with a valid key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/getgames',
						dataType: 'jsonp',
						data: {
							apiKey: settings.apiKey
						},
						success: function(d){
							expect(d).to.be.an('array');
							games = d;
							done();
						}
					});
				});
			});

			describe('vote', function(){
				it('returns FALSE on an invalid key', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/vote',
						dataType: 'jsonp',
						data:{
							apiKey: 'InVaLiDaPiKeY!',
							id: getGameId()
						},
						success: function(d){
							expect(d).to.be(false);
							done();
						}
					});
				});

				it('returns TRUE on success', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/vote',
						dataType: 'jsonp',
						data:{
							apiKey: settings.apiKey,
							id: getGameId()
						},
						success: function(d){
							expect(d).to.be(true);
							done();
						}
					});
				});
			});

			describe('gotit', function(){
				it('returns FALSE on invalid id or apiKey', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/setgotit',
						dataType: 'jsonp',
						data:{
							apiKey: 'InVaLiDaPiKeY!',
							id: getGameId()
						},
						success: function(d){
							expect(d).to.be(false); //returning true for some reason
							done();
						}
					});
				});

				it('returns TRUE on invalid id or apiKey', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/setgotit',
						dataType: 'jsonp',
						data:{
							apiKey: settings.apiKey,
							id: getGameId()
						},
						success: function(d){
							expect(d).to.be(true);
							done();
						}
					});
				});
			});

			describe('cleargames', function(){
				it('returns FALSE on invalid apiKey', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/cleargames',
						dataType: 'jsonp',
						data:{
							apiKey: 'InVaLiDaPiKeY!',
							id: 1
						},
						success: function(d){
							expect(d).to.be(false);
							done();
						}
					});
				});

				it('returns TRUE on success', function(done){
					$.ajax({
						url: settings.votingServiceUrl + '/cleargames',
						dataType: 'jsonp',
						data:{
							apiKey: settings.apiKey,
							id: 1
						},
						success: function(d){
							expect(d).to.be(true);
							done();
						}
					});
				});
			});
		});
	}
);