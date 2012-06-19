define(['jquery', 'app/settings', 'expect/expect'],
	function($, settings){
		describe('Service', function(){
			//let's test the service to make sure it does what it's supposed to

			//we are going to use jsonp with the snazzy jquery callback handler
			// describe('addnewgame', function(){
			// 	it('returns FALSE on invalid api key', function(){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/vote',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: '123',
			// 				title: 'test game'
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns TRUE on success', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/vote',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: settings.apiKey,
			// 				title: 'test game'
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});
			// });

			//describe('checkkey', function(){
			// it('returns FALSE on an invalid key', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/checkkey',
			// 			dataType: 'jsonp',
			// 			data: {
			// 				apiKey: '123'
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns true on a valid key', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/checkkey',
			// 			dataType: 'jsonp',
			// 			data: {
			// 				apiKey: settings.apiKey
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(true);
			// 				done();
			// 			}
			// 		});
			// 	});
			// });

			// describe('getgames', function(){
			// 	it('returns FALSE on invalid key', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/getgames',
			// 			dataType: 'jsonp',
			// 			data: {
			// 				apiKey: '123'
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns an array of objects with a valid key', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/getgames',
			// 			dataType: 'jsonp',
			// 			data: {
			// 				apiKey: settings.apiKey
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be.an('array');
			// 				done();
			// 			}
			// 		});
			// 	});
			// });

			// describe('vote', function(){
			// 	it('returns FALSE on an invalid key', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/vote',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: '123',
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns TRUE on success', function(done){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/vote',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: settings.apiKey,
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(true);
			// 				done();
			// 			}
			// 		});
			// 	});
			//});

			// describe('gotit', function(){
			// 	it('returns FALSE on invalid id or apiKey', function(){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/setgotit',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: '123',
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns FALSE on invalid id or apiKey', function(){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/setgotit',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: settings.apiKey,
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(true);
			// 				done();
			// 			}
			// 		});
			// 	});
			// });

			// describe('cleargames', function(){
			// 	it('returns FALSE on invalid apiKey', function(){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/cleargames',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: '123',
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(false);
			// 				done();
			// 			}
			// 		});
			// 	});

			// 	it('returns TRUE on success', function(){
			// 		$.ajax({
			// 			url: settings.votingServiceUrl + '/cleargames',
			// 			dataType: 'jsonp',
			// 			data:{
			// 				apiKey: settings.apiKey,
			// 				id: 1
			// 			},
			// 			success: function(d){
			// 				expect(d).to.be(true);
			// 				done();
			// 			}
			// 		});
			// 	});
			// });
		});
	}
);