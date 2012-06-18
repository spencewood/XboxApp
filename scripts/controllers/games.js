define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game',
	'app/helpers/sort',
	'app/lib/spine/spine'],
	function($, Base, Dailies, Game, sort){
		var Games = Base.sub({
			init: function(){
				Game.bind('create', Dailies.setToday);
				Game.bind('vote', Dailies.setToday);
				Game.bind('refresh, clear', this.proxy(this.addAll));
			},

			addOne: function(item){
				
			},

			addAll: function(){
				Game.each(this.proxy(this.addOne));
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