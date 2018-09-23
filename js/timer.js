function Timer(queueingTime, ue, timerType){
	
	var self = this;
	
	self.ue = ue;
	
	self.timerType = timerType;
	
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
			
			
			zog("start timer for " + self.timerType);
			
			if(self.timerType == "ps"){
			
				self.ue.updatePsQueuingTimer();
				zog("start animation for ps");
				
				self.ue.gui.getChildAt(1).animate({obj:{alpha:1, x:80}, time:200});
				
				
				self.clockTick = setInterval(function(){ self.ue.updatePsQueuingTimer(); }, 1000);
				
			}else{
				
				zog("start animation for speech");
				self.ue.updateSpeechQueuingTimer();
				
			    self.ue.gui.getChildAt(2).animate({obj:{alpha:1, x:80}, time:200});
			
				self.clockTick = setInterval(function(){ self.ue.updateSpeechQueuingTimer(); }, 1000); 
				
			}
			
			self.timeout = setTimeout(function(){ zog("timeout"); self.stopTimer(); }, self.queueingTime);
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
			
			
			
			if(self.timerType == "ps"){
				
				self.ue.updatePsQueuingTimer();
				
				self.ue.gui.getChildAt(1).animate({obj:{alpha:0, x:30}, time:200,  wait: 2000});
			}else{
				
				self.ue.updateSpeechQueuingTimer();
				
			    self.ue.gui.getChildAt(2).animate({obj:{alpha:0, x:30}, time:200, wait: 2000});
			}
			
			clearInterval(self.clockTick)
			
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