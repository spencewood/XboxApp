define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/settings'],
	function($, Base, Dailies, settings){
		//instance
		var GameTitle = Base.sub({
			tag: 'tr',
			className: 'game',
			events: {
				'click .vote-action': 'voteEvent',
				'click .owned-action': 'setOwnedEvent'
			},

			init: function(){
				if(!this.item){
					throw "GameTitle must have an item";
				}
			},

			render: function(template){
				return this.html(template(this.item));
			},

			voteEvent: function(e){
				e.preventDefault();
				this.vote();
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

			setOwnedEvent: function(e){
				e.preventDefault();
				this.setOwned();
			},

			setOwned: function(options){
				this.item.setOwned(options);
			}
		});

		return GameTitle;
	}
);