define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/settings'],
	function($, Base, Dailies, settings){
		var GameTitles = function(){};
		GameTitles.prototype = new Base();
		GameTitles.prototype.constructor = GameTitles;

		GameTitles.prototype.vote = function(id){
			if(this.canVote() && Dailies.isOpen()){
				this._ajaxVote(id, function(){
					Dailies.setToday();
				});
			}
			else{
				return false;
			}
			return true;
		};

		GameTitles.prototype._ajaxVote = function(id, cb){
			/*$.ajax({
				url: settings.votingServiceUrl + '/vote',
				dataType: 'jsonp',
				data: {
					apiKey: settings.apiKey
				},
				success: cb
			});*/
		};

		return GameTitles;
	}
);