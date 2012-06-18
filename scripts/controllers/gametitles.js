define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/settings'],
	function($, Base, Dailies, settings){
		var GameTitles = Base.sub({
			init: function(){
				if(!this.item){
					throw "GameTitle must have an item";
				}
			},

			vote: function(options){
				if(this.canVote() && Dailies.isOpen()){
					this.item.vote(options);
				}
				else{
					return false;
				}
				return true;
			},

			setOwned: function(options){
				this.item.setOwned(options);
			}
		});

		return GameTitles;
	}
);