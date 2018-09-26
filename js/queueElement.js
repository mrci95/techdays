function QueueElement(ue, prio, queuedConnection){
	
	var self = this;
	
	self.ue = ue;
	self.prio = prio;
	self.queuedConnection = queuedConnection;
	
	self.gui = undefined;
	
	self.show = function(){
		self.gui.alpha = 1;
	}
	
	self.hide = function(){
		self.gui.alpha = 0;
	}
	
	self.moveToPlaceInQueue = function(posx,posy){
		
		self.gui.animate({obj:{x:posx, y:posy}, time:1000});
	}
}