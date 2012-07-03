define(['controllers/dailies',
	'models/daily',
	'models/adminsetting',
	'helpers/date',
	'expect',
	'sinon',
	'mocha'],
	function(Dailies, Daily, AdminSetting, dateTool){
		describe('Dailies', function(){
			describe('Rules', function(){
				afterEach(function(){
					Daily.deleteAll();
					AdminSetting.deleteAll();
				});

				it('will store a marker for today when calling setToday', function(){
					var today = dateTool.getFormattedString(new Date());

					Dailies.setToday();
					expect(Daily.first().day).to.be(today);
				});

				it('will not set multiple storages with the same date', function(){
					Dailies.setToday();
					Dailies.setToday();
					expect(Daily.all().length).to.be(1);
				});

				it('will clear all storages when calling clear', function(){
					Dailies.setToday();
					expect(Daily.all().length).to.be(1);
					Dailies.clear();
					expect(Daily.all().length).to.be(0);
				});
			});
		});
	}
);
