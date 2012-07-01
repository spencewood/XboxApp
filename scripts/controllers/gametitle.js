define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/settings'],
	function($, Base, Dailies, settings){
		//instance
		var GameTitle = Base.sub({
			tag: 'tr',
			className: 'game control-group',

			events: {
				'click .vote-action': 'voteEvent',
				'click .owned-action': 'setOwnedEvent'
			},

			elements: {
				'.error': 'error'
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
				var error = (this.validate() || Dailies.validate());
				if(error && error.length){
					this.showError(error);
					return false;
				}
				else{
					this.item.vote(options, this.proxy(function(){
						this.showMessage('Vote successfully cast.', 'success');
					}));
					return true;
				}
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