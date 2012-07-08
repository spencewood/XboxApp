/*
 * Game Model:
 * The meat of the app. This handles all requests to the api and handles data transforms.
 * It also provides some convienence functions for games.
 */

define(['settings',
	'lib/spine/spine'],
	function(settings){
		if(window.Game){
			return window.Game;
		}

		var Game = Spine.Model.sub();
		Game.configure('Game', 'id', 'title', 'votes', 'owned');

		//example data:
		// {
		// api_id: "36",
		// id: "1258",
		// owned: "0",
		// title: "test game",
		// votes: "0"
		// };

		//private methods
		var connect = function(method, cb, data, options){
			//callback handling and triggering of custom events
			var handleCallBack = function(records){
				if(cb){
					cb(records);
				}
				Game.trigger(method);
				return records;
			};

			//purely for testing purposes
			if(options && options.disableAjax){
				return handleCallBack();
			}

			//the gateway to all api calls is here.
			//it uses the jsonp wrapper for jquery.
			//the callback is transparently handled and will be returned to success
			data = $.extend(data || {}, {apiKey: settings.apiKey});
			$.ajax({
				url: [settings.votingServiceUrl, method].join('/'),
				dataType: 'jsonp',
				data: data,
				success: handleCallBack,
				timeout : 10000, //this is essential for handling the jsonp error
				error: function(e){
					console.log(e);
					Game.trigger('error');
				}
			});
		};

		var scrubGameData = function(game){
			//return game data with correct data types
			return {
				id: parseInt(game.id, 10), //int
				owned: game.owned === "1", //bool
				title: game.title,
				votes: parseInt(game.votes, 10) //int
			};
		};

		//instance methods
		Game.include({
			vote: function(options, cb){
				connect('vote', this.proxy(function(){
					if(cb){
						cb();
					}
					this.updateAttribute('votes', this.votes + 1);
				}), {id: this.id}, options);
			},

			setOwned: function(options, cb){
				connect('setgotit', this.proxy(function(){
					if(cb){
						cb();
					}
					this.updateAttribute('owned', true);
				}), {id: this.id}, options);
			},

			//override spine's save method because we aren't using REST (default spine behavior)
			save: function(options, cb){
				if(!this.exists() && this.isValid()){
					//custom handling of game creation here
					connect('addnewgame', cb, {title: this.title}, options);
					this.constructor.__super__.create.apply(this);
				}
				else{
					//need to call this to fire spine events when updating
					this.constructor.__super__.update.apply(this);
				}
			},

			validate: function(){
				if(this.title === undefined || this.title.replace(/\s/g, '').length === 0){
					return "Game title must have a value.";
				}
				if(Game.findByAttribute('title', this.title) !== null){
					return "Game title already exists.";
				}
			}
		});

		//static methods
		Game.extend({
			clear: function(options, cb){
				Game.deleteAll();
				connect('cleargames', cb, null, options);
			},

			fetch: function(options, cb){
				connect('getgames', function(records){
					if(records){
						//need to scrub all of the fields for each record
						for(var i=0;i<records.length;i++){
							records[i] = scrubGameData(records[i]);
						}
						//spine creates a temporary record, we need to overwrite everything in memory
						Game.deleteAll();
						Game.refresh(records);
					}
					if(cb){
						cb();
					}
				}, null, options);
			}
		});

		//attaching to window because controllers need an identical reference for event binding
		window.Game = Game;

		return Game;
	}
);