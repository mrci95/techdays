function Queue(){
	
	var self = this;
	
	self.queue = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
	
	self.listQueue = function(){
		
		for( var i = 0; i < self.queue.length; i++){
			for( var j = 0; j < self.queue[i].length; j++){
				zog("UE(id: " + self.queue[i][j][0] + ", prio: " + self.queue[i][j][1] + ", queuedConnection: " + self.queue[i][j][2] + ")");
			}
		}
	}
	
	self.usersInQueue = function(){
		
		var users = 0;
		
		for( var i = 0; i < self.queue.length; i++){
			users +=  self.queue[i].length;
		}
		
		return users;
	}
	
	self.addToQueue = function(ueId, prio, queuedConnection){
		if(self.usersInQueue >= 10){
				return false;
		}
		
		var queuedUser = [ueId, prio, queuedConnection ];
		
		self.queue[prio].push(queuedUser);
		
		var conn;
		if(queuedConnection==connectionType.EULHS){
			conn = "PS";
		}else{
			conn = "CS";
		}
		
		DANGER('UE: ' + ueId + ' was added to the admission queue with priority = ' + prio + ' for ' + conn + ' connection');
		
		return true;
		
	}
}