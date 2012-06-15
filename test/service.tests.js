define(['jquery', 'app/settings', 'expect/expect'],
	function($, service){
		describe('Service', function(){
			//we are going to use jsonp with the snazzy jquery callback handler

			it('returns false on an invalid key', function(done){
				$.ajax({
					url: service.votingServiceUrl + '/checkkey',
					dataType: 'jsonp',
					data: {
						apiKey: '123'
					},
					success: function(d){
						expect(d).to.be(false);
						done();
					}
				});
			});
		});
	}
)