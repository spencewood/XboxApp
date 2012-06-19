define(['jquery',
	'app/settings',
	'app/lib/spine/spine'],
	function($, settings){
		var Game = Spine.Model.sub();
		Game.configure('Game', 'id', 'title', 'votes', 'owned');

		//private
		var connect = function(method, cb, data, options){
			Game.trigger(method);
			if(options && options.disableAjax){
				if(cb){
					cb();
				}
				return;
			}
			data = $.extend(data || {}, {apiKey: settings.apiKey});
			$.ajax({
				url: [settings.votingServiceUrl, method].join('/'),
				dataType: 'jsonp',
				data: data,
				success: cb,
				error: function(e){
					console.log(e);
				}
			});
		};

		//instance methods
		Game.include({
			vote: function(options, cb){
				connect('vote', cb, {id: this.id}, options);
			},

			setOwned: function(options, cb){
				connect('setgotit', cb, {id: this.id}, options);
				//Spine wants to call save after updating attributes. disable.
				this.updateAttribute('owned', true, {disableAjax: true});
			},

			//override spine's save method because we aren't using REST
			save: function(options, cb){
				connect('addnewgame', cb, {title: this.title}, options);
				return Game.__super__.save.call(this);
			}
		});

		//static methods
		Game.extend({
			clear: function(options, cb){
				connect('cleargames', cb, null, options);
				Game.deleteAll();
			},

			fetch: function(options, cb){
				connect('getgames', function(records){
					if(records){
						Game.refresh(records);
					}
					if(cb){
						cb();
					}
				}, null, options);
			}
		});
	

		return Game;
	}
);