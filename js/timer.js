function Timer(queueingTime, ue, timerType){
	
	var self = this;
	
	self.ue = ue;
	
	self.timerType = timerType;
	
	self.queueingTime = queueingTime;
	self.running = false;
	self.timeout = false;
	self.startTime = 0;
	self.stopTime = 0;
	self.timeout;
	self.clockTick;
	
	self.startTimer = function(){
		
		
		if(!self.running){
			
			
			self.running = true;
			self.timeout = false;
			
			zog("start timer timout " + self.timeout);
			
			var d = new Date();
			self.startTime = d.getTime();
			
			
			zog("start timer for " + self.timerType);
			
			if(self.timerType == queueingType.PS){
			
				self.ue.updatePsQueuingTimer();
				zog("start animation for ps");
				
				self.ue.gui.getChildAt(1).animate({obj:{alpha:1, x:80}, time:200});
				
				
				self.clockTick = setInterval(function(){ self.ue.updatePsQueuingTimer(); }, 1000);
			
				self.timeout = setTimeout(function(){ WARNING('Timeout on ps queuing timer for UE ' + self.ue.id ); this.timeout = true; self.ue.stopPsQueueingTime(); self.ue.deleteFromQueue(queueingType.PS); }, self.queueingTime);
				
			}else{
				
				zog("start animation for speech");
				self.ue.updateSpeechQueuingTimer();
				
			    self.ue.gui.getChildAt(2).animate({obj:{alpha:1, x:80}, time:200});
			
				self.clockTick = setInterval(function(){ self.ue.updateSpeechQueuingTimer(); }, 1000); 
			
				self.timeout = setTimeout(function(){ WARNING('Timeout on ps queuing timer for UE ' + self.ue.id ); this.timeout = true; self.ue.stopSpeechQueueingTime(); self.ue.deleteFromQueue(queueingType.SPEECH); }, self.queueingTime);
				
			}
			SUCCESS('Start ' + self.timerType + ' queuing timer for UE ' + self.ue.id);
		}
	}
	
	self.getStartTime = function(){
		return self.startTime;
	}
	
	self.stopTimer = function(){
		
		zog("stop timer timout " + self.timeout);
		
		if(self.running){
			
			
			self.running = false;
			var d = new Date();
			self.stopTime = d.getTime();
			
			var diff = self.stopTime - self.startTime;
			
			SUCCESS('Stop ' + self.timerType + ' queuing timer for UE ' + self.ue.id + '. Time spend in queue: ' + self.getCurrentTimeString());
			
			
			
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