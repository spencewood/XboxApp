/*
 * Games Controller:
 * This handles the lists of games and binding events to the Game model. It is in charge of the games table.
 */

define(['controllers/_rulebase',
	'controllers/gametitle',
	'controllers/dailies',
	'models/game',
	'helpers/sort',
	'helpers/string',
	'lib/text!views/all_row.tpl',
	'lib/spine/spine'],
	function(Base, GameTitle, Dailies, Game, sort, string, all_row_template){
		var all_row_tmpl = Handlebars.compile(all_row_template);

		var Games = Base.sub({
			el: $('#games tbody'),
			show: 'All',

			elements: {
				'#games tbody': 'rows',
				'#tab-nav': 'tabNav'
			},

			init: function(){
				//setting up event bindings for when the Game changes
				//any time a game is created or a vote happens, set the daily limit
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				//when refreshing the list or updating, rerender the list of games
				Game.bind('refresh', this.proxy(this.addSelected));
				Game.bind('update', this.proxy(this.addSelected));
				//we need to get the latest list when something new since the api only returns true on addnewgame
				Game.bind('addnewgame', this.proxy(this.fetch));
				//handle errors
				Game.bind('error', this.proxy(this.showError));
			},

			fetch: function(){
				Game.fetch();
			},

			//fetch the records from ajax, or if we have some just show what we have
			fetchOrShow: function(type){
				this.show = type;
				if(Game.all().length === 0){
					this.fetch();
				}
				else{
					this.addSelected();
				}
			},

			addSelected: function(){
				this.proxy(this.addAll(this['get'+string.ucFirst(this.show)]()));
			},

			//create a new gametitle controller for each item, so it can render itself
			addOne: function(item){
				var title = new GameTitle({item: item});
				this.append(title.render(all_row_tmpl));
			},

			//add all of the games that we know about
			addAll: function(items){
				this.el.empty();
				
				if(items && items.length){
					for(var i=0;i<items.length;i++){
						this.proxy(this.addOne(items[i]));
					}
					this.el.parent().show();
				}
				else{
					this.el.parent().hide();
					this.showSimpleMessage('No games found.');
				}
				
			},

			getAll: function(){
				return Game.all();
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes')).reverse();
			},

			getWanted: function(){
				return this.getUnowned();
			}
		});

		return Games;
	}
);
