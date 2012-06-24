define(['app/lib/spine/spine', 'app/lib/spine/ajax', 'app/lib/spine/local'],
	function(){
		var AdminSetting = Spine.Model.sub();
		AdminSetting.configure('AdminSetting', 'setting', 'added');
		AdminSetting.extend(Spine.Model.Local);

		return AdminSetting;
	}
);