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
	
	self.alreadyInQueue = function(ueId, prio, queuedConnection){
		
		for( var i = 0; i < self.queue[prio].length; i++){
			
			if(self.queue[prio][i][0] == ueId && self.queue[prio][i][2] == queuedConnection ){
				
				return true;
			}
		}
	}
	
	self.addToQueue = function(ueId, prio, queuedConnection){
		if(self.usersInQueue() >= 10){
				return 'queueFull';
		}
		
		if(self.alreadyInQueue(ueId, prio, queuedConnection)){
				return 'alreadyInQueue';
		}
		
		var queuedUser = [ueId, prio, queuedConnection ];
		
		self.queue[prio].push(queuedUser);
		
		var conn;
		if( queuedConnection == queueingType.PS){
			conn = "PS";
		}else{
			conn = "CS";
		}
		
		DANGER('UE: ' + ueId + ' was added to the admission queue with priority = ' + prio + ' for ' + conn + ' connection');
		
		
		zog(self.queue);
		
		return 'queued';
		
	}
	
	self.removeFromQueue = function(ueId, prio, queuedConnection){
		if(self.usersInQueue > 0){
				return false;
		}
		
		for( var i = 0; i < self.queue[prio].length; i++){

			
			zog(self.queue[prio][i]);
			
			if(self.queue[prio][i][0] == ueId && self.queue[prio][i][2] == queuedConnection ){
				self.queue[prio].splice(i,1);
				zog(self.queue);
				
				return true;
			}
		}
		
		zog(self.queue);
		
		return false;
		
	}
}