define(['app/controllers/games',
	'app/controllers/gametitle',
	'app/controllers/dailies',
	'app/models/daily',
	'app/models/game',
	'app/helpers/date',
	'expect/expect',
	'sinon/sinon'],
	function(Games, GameTitle, Dailies, Daily, Game, dateTool){
		describe('Integration', function(){
			var title = null,
				game = new Game({title: 'test game', owned: true}).save({disableAjax: true});

			before(function(){
				$('#games').empty();
			});

			beforeEach(function(){
				game.save({disableAjax: true});
				var games = new Games({el: $('#games')});
				games.addSelected();
			});

			afterEach(function(){
				Game.deleteAll();
				$('#games').empty();
			});

			it('adds correct number of games to the page', function(){
				expect($('#games').find('li').size()).to.be(1);
			});

			it('cleans up the games list before adding new ones', function(){
				$('#games').append($('<li>', {text: 'test'}));
				var games = new Games({el: $('#games')});
				games.addSelected();
				games.addSelected();
				expect($('#games li.game').size()).to.be(1);
			});

			it('sets vote when clicking on vote button for this game', function(){
				var spy = sinon.spy(GameTitle.prototype, 'voteEvent');
				var stub = sinon.stub(GameTitle.prototype, 'vote', function(){});
				$('#games li:first .vote-action').click();
				expect(GameTitle.prototype.voteEvent.called).to.be(true);
				stub.restore();
			});

			it('calls setOwnedEvent when clicking on the owned button for this game', function(){
				var spy = sinon.spy(GameTitle.prototype, 'setOwnedEvent');
				var stub = sinon.stub(GameTitle.prototype, 'setOwned', function(){});
				$('#games li:first .owned-action').click();
				expect(GameTitle.prototype.setOwnedEvent.called).to.be(true);
				stub.restore();
			});
		});
	}
);