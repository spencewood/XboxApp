define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/gametitle',
	'app/controllers/dailies',
	'app/models/game',
	'app/helpers/sort',
	'app/lib/spine/spine',
	'app/lib/spine/route'],
	function($, Base, GameTitle, Dailies, Game, sort){
		var Games = Spine.Controller.sub({
			el: $('#games tbody'),
			show: 'All',

			init: function(){
				//setting up event bindings for when the Game changes
				//any time a game is created or a vote happens, set the daily limit
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				//on any of the following actions, rerender the list of games
				Game.bind('refresh', this.proxy(this.addSelected));
				Game.bind('cleargames', this.proxy(this.addSelected));
				Game.bind('setgotit', this.proxy(this.addSelected));
				Game.bind('vote', this.proxy(this.addSelected));
				//we need to get the latest list when something new since the api only returns true on addnewgame
				Game.bind('addnewgame', this.proxy(this.fetch));

				this.routes({
					'/games/all': this.proxy(function(){
						this.show = 'All';
						this.fetchOrShow();
					}),
					'/games/owned': this.proxy(function(){
						this.show = 'Owned';
						this.fetchOrShow();
					}),
					'/games/wanted': this.proxy(function(){
						this.show = 'Unowned';
						this.fetchOrShow();
					})
				});

				Spine.Route.setup();
			},

			fetch: function(){
				Game.fetch();
			},

			fetchOrShow: function(){
				if(Game.all().length === 0){
					this.fetch();
				}
				else{
					this.addSelected();
				}
			},

			addSelected: function(){
				this.proxy(this.addAll(this['get'+this.show]()));
			},

			addOne: function(item){
				var title = new GameTitle({item: item});
				this.append(title.render());
			},

			addAll: function(items){
				this.el.empty();
				for(var i=0;i<items.length;i++){
					this.proxy(this.addOne(items[i]));
				}
			},

			getAll: function(){
				return Game.all();
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes'));
			}
		});

		return new Games();
	}
);
