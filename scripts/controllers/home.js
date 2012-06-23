define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game'],
	function($, Base, Dailies, Game){
		var Home = Base.sub({
			el: $('body'),
			events: {
				'keypress #addGame': 'keypressEvent',
				'click #clearGames': 'clearEvent',
				'click #submitAddGame': 'addGameEvent'
			},

			elements: {
				'#addGame': 'addGameInput',
				'#addGameSubmit': 'addGameSubmit',
				'#errorMessage': 'errorMessage',
				'#globalError': 'globalError'
			},

			keypressEvent: function(e){
				if(e.keyCode === 13){
					e.preventDefault();
					this.addGame(this.addGameInput.val());
				}
			},

			addGameEvent: function(e){
				e.preventDefault();
				this.addGame(this.addGameInput.val());
			},

			clearEvent: function(e){
				e.preventDefault();
				this.clear();
			},

			addGame: function(title, options){
				var game = new Game({ title: title });
				if(this.showError(this.validate() || Dailies.validate() || game.validate())){
					game.save();
					return true;
				}
				return false;
			},

			clear: function(options){
				Game.clear(options);
			},

			showError: function(error){
				if(error && error.length){
					this.errorMessage.text(error);
					this.globalError.addClass('error');
					return false;
				}
				else{
					this.errorMessage.empty();
					this.globalError.removeClass('error');
					return true;
				}
			}
		});

		return new Home();
	}
);
