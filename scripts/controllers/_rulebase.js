/*
 * Base Controller:
 * This is inherited by several other controllers to gain additional "rule" functionality
 * It also shows messages
 */

define(['models/adminsetting',
	'helpers/date',
	'lib/text!views/message.tpl',
	'lib/spine/spine',
	'lib/handlebars'],
	function(AdminSetting, dateTool, message_template){
		var tmpl = Handlebars.compile(message_template);
		
		AdminSetting.fetch();
		var base = Spine.Controller.sub({
			canVote: function(){
				var setting = AdminSetting.findByAttribute('setting','voteweekend');
				//if the setting is set for weekend votes
				if(setting !== null){
					return true;
				}
				switch(this.getDate().getDay()){
					case 1: //Monday
					case 2: //Tuesday
					case 3: //Wednesday
					case 4: //Thursday
					case 5: //Friday
						return true;
					case 6: //Saturday
					case 0: //Sunday
						return false;
				}
			},

			validate: function(){
				return this.canVote() ? '' : 'Adding games and voting is not allowed on weekends.';
			},

			showMessage: function(message, type){
				type = type || 'alert';
				this.clearMessage();
				var model = {
					message: message,
					type: type.length ? ('alert-' + type) : ''
				};

				$('.message-area:visible').html(tmpl(model));
			},

			showSimpleMessage: function(message){
				$('.message-area:visible').text(message);
			},

			showError: function(text){
				text = text || 'Error processing request.';
				this.showMessage(text, 'error');
			},

			clearMessage: function(){
				$('.message-area').empty();
			}
		});

		base.prototype.getDate = dateTool.getDate;

		return base;
	}
);
