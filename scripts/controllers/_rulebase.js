define(['app/helpers/date'],
	function(dateTool){
		var base = Spine.Controller.sub({
			canVote: function(){
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
			}
		});

		base.prototype.getDate = dateTool.getDate;

		return base;
	}
);