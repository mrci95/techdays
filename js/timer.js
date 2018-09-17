function Timer(queueingTime, ue){
	
	var self = this;
	
	self.ue = ue;
	
	self.queueingTime = queueingTime;
	self.running = false;
	self.startTime = 0;
	self.stopTime = 0;
	self.timeout;
	self.clockTick;
	
	self.startTimer = function(){
		
		
		if(!self.running){
			
			
			self.running = true;
			var d = new Date();
			self.startTime = d.getTime();
			
			
			zog("start timer: " + self.startTime);
			
			self.ue.gui.getChildAt(3).animate({obj:{alpha:1}, time:200});
			
			self.ue.updateQueuingTimer();
			
			clockTick = setInterval(function(){ self.ue.updateQueuingTimer(); }, 1000); 
			
			timeout = setTimeout(function(){ zog("timeout"); self.stopTimer(); }, self.queueingTime);
		}
	}
	
	self.getStartTime = function(){
		return self.startTime;
	}
	
	self.stopTimer = function(){
		if(self.running){
			
			
			self.running = false;
			var d = new Date();
			self.stopTime = d.getTime();
			
			var diff = self.stopTime - self.startTime;
			
			self.ue.updateQueuingTimer();
			
			self.ue.gui.getChildAt(3).animate({obj:{alpha:0}, time:500, wait:2000});
			
			clearInterval(clockTick)
			
			clearTimeout(self.timeout);
		}
	}
	
	self.getStopTime = function(){
		return self.stopTime;
	}
	
	self.getCurrentTime = function(){
		
			var d = new Date();
			var currentTime = d.getTime();
			
			return currentTime - self.startTime;
	}
	
	self.getCurrentTimeString = function(){
		var currentTimer;
		if(self.running){	
			currentTimer= self.getCurrentTime();
		}else{
			currentTimer= self.stopTime - self.startTime;
		}
		
		var seconds = Math.floor(currentTimer/1000);
		
		return seconds + ' sec';
	}
}