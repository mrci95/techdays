function QueuePlace(){
	
	var self = this;
	
	self.x = undefined;
	self.y = undefined;
	
	self.gui = undefined;
	
	self.createQueuePlace = function(posx, posy, parrentCandidate){
		self.x = posx;
		self.y = posy;
		
		self.gui = new Rectangle(40,40, "white").addTo(parrentCandidate).reg(20,20).pos(posx,posy);
	}
	
	self.getGlobalPos = function(){
		
		return self.gui.parent.parent.localToGlobal(self.gui.x, self.gui.y);
	}
	
}