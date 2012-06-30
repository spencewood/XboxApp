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
				'click .confirm': 'confirmEvent',
				'click #clearGames': 'clearEvent',
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

			confirmEvent: function(e){
				var target = $(e.currentTarget);
				if(!confirm(target.data('confirm-message'))){
					//not working
					e.stopPropagation();
					return false;
				}
				return true;
			},

			clearEvent: function(e){
				e.preventDefault();
				this.clear();
			},

			clear: function(options){
				Game.clear(options);
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