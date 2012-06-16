define(['jquery', 'app/controllers/dailies', 'app/helpers/date', 'app/settings'],
	function($, Dailies, dateTool, settings){
		var Votes = Spine.Controller.sub({
			canVote: function(){
				switch(this.getDate().getDay()){
					case 1: //Monday
					case 2: //Tuesday
					case 3: //Wednesday
					case 4: //Thursday
					case 5: //Friday
						return true;
					case 6: //Saturday
					case 0: //Sunday
						return false;
				}
			},

			vote: function(id){
				if(this.canVote() && Dailies.open()){
					this._ajaxVote(id, function(){
						Dailies.setToday();
					});
				}
				else{
					return false;
				}
				return true;
			},

			_ajaxVote: function(id, cb){
				/*$.ajax({
					url: settings.votingServiceUrl + '/vote',
					dataType: 'jsonp',
					data: {
						apiKey: settings.apiKey
					},
					success: cb
				});*/
			}
		});

		Votes.prototype.getDate = dateTool.getDate;

		return Votes;
	}
);