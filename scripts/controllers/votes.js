define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/helpers/date',
	'app/settings'],
	function($, Base, Dailies, dateTool, settings){
		var Votes = function(){};
		Votes.prototype = new Base();

		Votes.prototype.vote = function(id){
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

		Votes.prototype._ajaxVote = function(id, cb){
			/*$.ajax({
				url: settings.votingServiceUrl + '/vote',
				dataType: 'jsonp',
				data: {
					apiKey: settings.apiKey
				},
				success: cb
			});*/
		};

		return Votes;
	}
);