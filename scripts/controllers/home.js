define(['jquery',
	'app/controllers/_rulebase',
	'app/controllers/dailies',
	'app/models/game',
	'app/models/adminsetting',
	'app/lib/text!app/views/admin.tpl',
	'app/lib/spine/spine',
	'app/lib/spine/route',
	'app/lib/handlebars'],
	function($, Base, Dailies, Game, AdminSetting, adminTemplate){
		var adminTmpl = Handlebars.compile(adminTemplate);

		var Home = Base.sub({
			el: $('body'),
			events: {
				'click .confirm': 'confirmEvent',
				'keypress #addGame': 'keypressEvent',
				'click #clearGames': 'clearEvent',
				'click #submitAddGame': 'addGameEvent',
				'change #content .admin-content :checkbox': 'changeSettingEvent'
			},

			elements: {
				'#addGame': 'addGameInput',
				'#addGameSubmit': 'addGameSubmit',
				'#errorMessage': 'errorMessage',
				'#globalError': 'globalError',
				'#content .admin-content': 'adminContent',
				'#home-pill': 'homePill',
				'#admin-pill': 'adminPill'
			},

			init: function(){
				this.routes({
					'/': this.proxy(function(){
						this.showPage('home');
					}),
					'/admin': this.proxy(function(){
						this.showPage('admin');
					})
				});
				
				Spine.Route.setup();

				AdminSetting.fetch();

				this.renderAdminSection();
			},

			changeSettingEvent: function(e){
				AdminSetting.destroyAll();
				this.getSettings().each(function(idx, setting){
					new AdminSetting({setting: setting}).save();
				});
			},

			confirmEvent: function(e){
				var target = $(e.currentTarget);
				if(!confirm(target.data('confirm-message'))){
					//not working
					e.stopPropagation();
					return false;
				}
				return true;
			},

			keypressEvent: function(e){
				if(e.keyCode === 13){
					e.preventDefault();
					this.addGame(this.addGameInput.val());
				}
			},

			addGameEvent: function(e){
				e.preventDefault();
				this.addGame(this.addGameInput.val());
			},

			clearEvent: function(e){
				e.preventDefault();
				this.clear();
			},

			getSettings: function(){
				return this.adminContent.find(':checkbox:checked').map(function(){
					var setting = $(this).data('setting');
					if(setting && setting.length){
						return setting;
					}
				});
			},

			renderAdminSection: function(){
				var settings = {},
					local = AdminSetting.toJSON();
				for(var i=0;i<local.length;i++){
					settings[local[i].setting] = true;
				}
				this.adminContent.html(adminTmpl(settings));
			},

			showPage: function(page){
				this.el.removeClass().addClass(page);
				this.homePill.add(this.adminPill).removeClass();
				this[page+'Pill'].addClass('active');
			},

			addGame: function(title, options){
				var game = new Game({ title: title });
				if(!this.showError(this.validate() || Dailies.validate() || game.validate())){
					game.save(options);
					this.addGameInput.val('');
					return true;
				}
				return false;
			},

			clear: function(options){
				Game.clear(options);
			},

			showError: function(error){
				if(error && error.length){
					this.errorMessage.text(error);
					this.globalError.addClass('error');
					return true;
				}
				else{
					this.errorMessage.empty();
					this.globalError.removeClass('error');
					return false;
				}
			}
		});

		return new Home();
	}
);
