/*
 * GameTitle Controller:
 * One GameTitle controller is made for every game listed. This handles per-game rendering (rows) and events.
 */

define(['controllers/_rulebase',
	'controllers/dailies',
	'settings',
	'lib/spine/spine'],
	function(Base, Dailies, settings){
		//instance
		var GameTitle = Base.sub({
			tag: 'tr',
			className: 'game control-group',

			//these are events to be bound with jquery by spine
			events: {
				'click .vote-action': 'voteEvent',
				'click .owned-action': 'setOwnedEvent'
			},

			//elements bound to the controller by spine
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