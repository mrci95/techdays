function MobilityBehavior(ue){
	
	var self = this;
	
	var ueToMove = ue;
	
	self.gui = undefined;
	
	self.points = new Array();
	
	self.loop = false;
	self.showed = false;
	
	self.isMoving = false;
	
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
	
	self.clear = function(){
		self.gui.removeAllChildren();
		
		self.points = [];
		
	}
	
	self.start = function(){
		
		if(self.points.length < 2)
			return;
		
		
		
		self.moveUe();
	}
	
	self.stop = function(){
		
	}
	
	self.moveUe = function(){
		
		self.isMoving = true;
		
		var checkPoints = self.getCheckPointsList();
		
		ueToMove.gui.animate({ // circle will be the default object for the inner animations
		  props: checkPoints,
		  time:1000, // will be the default time for the inner animations
		  ease:"linear", // will be the default ease for the inner animations
		  call:function(){if(self.loop){self.moveUe();}}
	   });
		
	}
	
	self.getCheckPointsList = function(){
		
		var checkPoints = [];
		
		for(var i = 0; i < self.points.length; i++){
			checkPoints.push({props:{x:self.points[i].x, y:self.points[i].y}});
		}
		
		return checkPoints;
		
		
	}
	
	
	
}