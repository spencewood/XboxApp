define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/gametitle',
	'app/controllers/dailies',
	'app/models/game',
	'app/helpers/sort',
	'app/lib/spine/spine',
	'app/lib/spine/route'],
	function($, Base, GameTitle, Dailies, Game, sort){
		var Games = Base.sub({
			show: 'All',

			init: function(){
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				Game.bind('refresh', this.proxy(this.addSelected));
				Game.bind('clear', this.proxy(this.addSelected));

				var self = this;
				this.routes({
					'/owned': function(params){
						self.show = 'Owned';
						self.fetchOrShow();
					},
					'/wanted': function(params){
						self.show = 'Unowned';
						self.fetchOrShow();
					}
				});

				//this.fetchOrShow();
			},

			fetchOrShow: function(){
				if(Game.all().length === 0){
					Game.fetch();
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
				items.each(this.proxy(this.addOne));
			},

			getAll: function(){
				return Game;
			},

			getOwned: function(){
				return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
			},

			getUnowned: function(){
				return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes'));
			},

			titleExists: function(title){
				return Game.findByAttribute('title', title) !== null;
			},

			add: function(title, options){
				if(!this.titleExists(title) && this.canVote() && Dailies.isOpen()){
					new Game({ title: title }).save(options);
					return true;
				}
				return false;
			},

			clear: function(options){
				Game.clear(options);
			}
		});

		return Games;
	}
);