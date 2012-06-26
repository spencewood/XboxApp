define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/settings',
	'app/lib/text!app/views/gametitle.tpl',
	'app/lib/handlebars'],
	function($, Base, Dailies, settings, template){
		var tmpl = Handlebars.compile(template);

		//instance
		var GameTitle = Base.sub({
			tag: 'tr',
			className: 'game',
			events: {
				'click .vote-action': 'voteEvent',
				'click .owned-action': 'setOwnedEvent'
			},

			init: function(){
				if(!this.item){
					throw "GameTitle must have an item";
				}
			},

			render: function(item){
				if(item){
					this.item = item;
				}
				return this.html(this.template(this.item));
			},

			template: function(items){
				return tmpl(items);
			},

			voteEvent: function(e){
				e.preventDefault();
				this.vote();
			},

			vote: function(options){
				if(this.canVote() && Dailies.isOpen()){
					this.item.vote(options);
				}
				else{
					return false;
				}
				return true;
			},

			setOwnedEvent: function(e){
				e.preventDefault();
				this.setOwned();
			},

			setOwned: function(options){
				this.item.setOwned(options);
			}
		});

		return GameTitle;
	}
);