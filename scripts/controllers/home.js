define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game'],
	function($, Base, Dailies, Game){
		var Home = Base.sub({
			el: $('body'),
			events: {
				'keypress #addGame': 'keypressEvent'
			},

			elements: {
				'#addGame': 'addGameInput',
				'#addGameSubmit': 'addGameSubmit'
			},

			keypressEvent: function(e){
				if(e.keyCode === 13){
					e.preventDefault();
					this.addGame(this.addGameInput.val());
				}
			},

			addGame: function(title, options){
				var game = new Game({ title: title });
				if(this.canVote() && Dailies.isOpen() && !game.validate()){
					game.save();
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
