function MobilityBehavior(){
	
	var self = this;
	
	self.gui = undefined;
	
	self.points = new Array();
	
	self.loop = false;
	
	self.addPoint = function(posx,posy){
		self.points.push({x:posx, y:posy});
	}
	
	self.drawLine = function(){
		self.gui.removeAllChildren();
		
		if(self.points.length < 2)
			return;
		
		for(var i = 0; i < self.points.length-1; i++){
				
				var line = new createjs.Shape();
				line.graphics.setStrokeStyle(3);
				line.graphics.beginStroke("red");
				line.graphics.moveTo(self.points[i].x, self.points[i].y);
				line.graphics.lineTo(self.points[i+1].x, self.points[i+1].y);
				line.graphics.endStroke(); 
				
				self.gui.addChild(line);
				
		}
		
		if(self.loop){
			
			var line = new createjs.Shape();
			line.graphics.setStrokeStyle(3);
			line.graphics.beginStroke("red");
			line.graphics.moveTo(self.points[self.points.length-1].x, self.points[self.points.length-1].y);
			line.graphics.lineTo(self.points[0].x, self.points[0].y);
			line.graphics.endStroke(); 
			
			self.gui.addChild(line);
		}
		
	}
	
}