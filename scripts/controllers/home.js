/*
 * Home Controller:
 * This controller handles anything under the home tab that is not part of the games table.
 * It is a messenger to the Games controller and is in charge of adding new games.
 */

define(['controllers/_rulebase',
	'controllers/dailies',
	'controllers/games',
	'models/game',
	'lib/spine/spine'],
	function(Base, Dailies, Games, Game){
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
					error = (this.validate() || Dailies.validate() || game.validate());
				if(error && error.length){
					this.showError(error);
					return false;
				}
				else{
					game.save(options, this.proxy(function(){
						this.showMessage('Game added!', 'success');
					}));
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
