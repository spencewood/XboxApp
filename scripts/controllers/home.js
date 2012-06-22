define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game'],
	function($, Base, Dailies, Game){
		var Home = Base.sub({
			el: $('body'),
			events: {
				'keyup #addGame': 'keyupEvent'
			},

			elements: {
				'#addGame': 'addGameInput',
				'#addGameSubmit': 'addGameSubmit'
			},

			keyupEvent: function(e){
				console.log(e);
				e.preventDefault();
				if(e.keyCode === 13){
					this.addGame(this.addGameInput.val());
				}
			},

			addGame: function(title, options){
				if(!Game.titleExists(title) && this.canVote() && Dailies.isOpen()){
					new Game({ title: title }).save(options);
					return true;
				}
				return false;
			},

			clear: function(options){
				Game.clear(options);
			}
		});

		return new Home();
	}
);
