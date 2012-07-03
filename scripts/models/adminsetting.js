/*
 * AdminSettings Model:
 * This stores user preferences in Local Storage.
 * There are only two right now: vote on weekends and vote multiple times a day
 */

define(['lib/spine/spine',
	'lib/spine/ajax',
	'lib/spine/local'],
	function(){
		if(window.AdminSetting){
			return window.AdminSetting;
		}

		var AdminSetting = Spine.Model.sub();
		AdminSetting.configure('AdminSetting', 'setting', 'added');
		AdminSetting.extend(Spine.Model.Local);

		//attaching to window because controllers need an identical reference
		window.AdminSetting = AdminSetting;
		
		return AdminSetting;
	}
);