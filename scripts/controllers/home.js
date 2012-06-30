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
				var game = new Game({ title: title });
				if(!this.showError(this.validate() || Dailies.validate() || game.validate())){
					game.save(options);
					this.addGameInput.val('');
					return true;
				}
				return false;
			},

			showGames: function(type){
				type = type || 'all';
				this.games.fetchOrShow(type);
				this.updateMenu(type);
			},

			showError: function(error){
				if(error && error.length){
					this.errorMessage.text(error);
					this.globalError.addClass('error');
					return true;
				}
				else{
					this.errorMessage.empty();
					this.globalError.removeClass('error');
					return false;
				}
			},

			updateMenu: function(type){
				console.log($('#tab-nav li').filter('.' + type + '-tab'), '.' + type + '-tab');

				$('#tab-nav li').removeClass('active')
					.filter('.' + type + '-tab').addClass('active');
			}
		});

		return Home;
	}
);
