define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/controllers/games',
	'app/models/game',
	'app/lib/spine/spine',
	'app/lib/spine/route',
	'app/lib/handlebars'],
	function($, Base, Dailies, Games, Game){
		var Home = Base.sub({
			el: '.home-content',

			events: {
				'keypress #addGame': 'keypressEvent',
				'click #submitAddGame': 'addGameEvent'
			},

			elements: {
				'#addGame': 'addGameInput',
				'#addGameSubmit': 'addGameSubmit',
				'#errorMessage': 'errorMessage',
				'#globalError': 'globalError'
			},

			init: function(){
				this.games = new Games();
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

			addGame: function(title, options){
				var game = new Game({ title: title }),
					error = (this.validate() || Dailies.validate() || game.validate()),
					self = this;
				if(error && error.length){
					this.showError(error);
					return false;
				}
				else{
					game.save(options, function(){
						self.showMessage('Game added!', 'success');
					});
					this.addGameInput.val('');
					
					return true;
				}
			},

			showGames: function(type){
				type = type || 'all';
				this.games.fetchOrShow(type);
				this.updateMenu(type);
			},

			updateMenu: function(type){
				$('#tab-nav li').removeClass('active')
					.filter('.' + type + '-tab').addClass('active');
			}
		});

		return Home;
	}
);
