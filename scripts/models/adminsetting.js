define(['app/lib/spine/spine',
	'app/lib/spine/ajax',
	'app/lib/spine/local'],
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