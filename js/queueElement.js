function QueueElement(ue, prio, queuedConnection){
	
	var self = this;
	
	self.ue = ue;
	self.prio = prio;
	self.queuedConnection = queuedConnection;
	
	self.gui = undefined;
	
	self.show = function(){
		self.gui.animate({obj:{alpha:1}, time:300});
	}
	
	self.hide = function(){
		self.gui.animate({obj:{alpha:0}, time:300});
	}
	
	self.moveToPlaceInQueue = function(posx,posy){
		
		self.gui.animate({obj:{x:posx, y:posy}, time:1000});
	}
}