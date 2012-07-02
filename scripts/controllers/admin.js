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

		var Admin = Base.sub({
			el: '.admin-content',

			events: {
				'click #clearGames': 'clearGamesEvent',
				'click #clearDaily': 'clearDailyEvent',
				'change :checkbox': 'changeSettingEvent'
			},

			elements: {
				'#admin-pill': 'adminPill'
			},

			init: function(){
				AdminSetting.fetch();
				this.render();
			},

			changeSettingEvent: function(e){
				AdminSetting.destroyAll();
				this.getSettings().each(function(idx, setting){
					new AdminSetting({setting: setting}).save();
				});
			},

			_confirm: function(e, func){
				e.preventDefault();
				var target = $(e.currentTarget);
				if(confirm(target.data('confirm-message'))){
					func();
				}
			},

			clearGamesEvent: function(e){
				this._confirm(e, this.proxy(function(){
					this.clearGames();
					this.showMessage('All games cleared.', 'block');
				}));
			},

			clearDailyEvent: function(e){
				this._confirm(e, this.proxy(function(){
					this.clearDaily();
					this.showMessage('Daily token cleared', 'block');
				}));
			},

			clearGames: function(options){
				Game.clear(options);
			},

			clearDaily: function(){
				Dailies.clear();
			},

			getSettings: function(){
				return this.el.find(':checkbox:checked').map(function(){
					var setting = $(this).data('setting');
					if(setting && setting.length){
						return setting;
					}
				});
			},

			render: function(){
				var settings = {},
					local = AdminSetting.toJSON();
				for(var i=0;i<local.length;i++){
					settings[local[i].setting] = true;
				}
				this.append(adminTmpl(settings));
			}
		});

		return Admin;
	}
);