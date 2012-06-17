define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game',
	'app/helpers/sort',
	'app/lib/spine/spine'],
	function($, Base, Dailies, Game, sort){
		var Games = function(){
			Game.bind('create', Dailies.setToday);
		};
		Games.prototype = new Base();
		Games.prototype.constructor = Games;

		Games.prototype.getOwned = function(){
			return Game.findAllByAttribute('owned', true).sort(sort.byProperty('title'));
		};

		Games.prototype.getUnowned = function(){
			return Game.findAllByAttribute('owned', false).sort(sort.byProperty('votes'));
		};

		Games.prototype.titleExists = function(title){
			return Game.findByAttribute('title', title) !== null;
		};

		Games.prototype.add = function(title){
			if(!this.titleExists(title) && this.canVote() && Dailies.isOpen()){
				new Game({ title: title }).save();
				return true;
			}
			return false;
		};

		return Games;
	}
);