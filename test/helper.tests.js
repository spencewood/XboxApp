define(['app/helpers/date',
	'app/helpers/sort',
	'expect/expect',
	'sinon/sinon'],
	function(dateTool){
		describe('Utilies', function(){
			describe('Date', function(){
				it('returns dates in the correct format when calling getFormattedString', function(){
					var today = new Date(),
						expectedString = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
					expect(dateTool.getFormattedString()).to.be(expectedString);
				});
			});
		});
	}
);
