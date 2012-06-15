define(['jquery'], 
	function($){
		var Votes = Spine.Controller.sub({
			getDate: function(){
				return new Date();
			},

			canVote: function(){
				switch(this.getDate().getDay()){
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						return true;
					case 6:
					case 0:
						return false;
				}
			}
		});

		return Votes;
	}
);