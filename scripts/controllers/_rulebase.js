define(['app/models/AdminSetting',
	'app/helpers/date',
	'app/lib/text!app/views/message.tpl'],
	function(AdminSetting, dateTool, message_template){
		var messageArea = $('#message-area'),
			tmpl = Handlebars.compile(message_template);

		var base = Spine.Controller.sub({
			canVote: function(){
				AdminSetting.fetch();
				var setting = AdminSetting.findByAttribute('setting','voteweekend');
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
				return this.canVote() ? '' : 'Adding games and voting is not allowed on weekends';
			},

			showMessage: function(message, type){
				type = type || 'alert';
				this.clearMessage();
				model = {
					message: message,
					type: type.length ? ('alert-' + type) : ''
				};

				messageArea.html(tmpl(model));
			},

			showError: function(text){
				text = text || 'Error processing request';
				this.showMessage(text, 'error');
				// if(text && text.length){
				// 	block.text(text);
				// 	container.addClass('error');
				// 	return true;
				// }
				// else{
				// 	block.empty();
				// 	container.removeClass('error');
				// 	return false;
				// }
			},

			clearMessage: function(){
				messageArea.empty();
			}
		});

		base.prototype.getDate = dateTool.getDate;

		return base;
	}
);