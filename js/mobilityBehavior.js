function MobilityBehavior(ue){
	
	var self = this;
	
	var ueToMove = ue;
	
	var loopFinished = true;
	
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
		
		if(!self.isMoving){
			self.gui.removeAllChildren();
			
			self.points = [];
		}
		
	}
	
	self.start = function(){
		
		if(self.points.length < 2)
			return;
		
		if(!loopFinished)
			return;
		
		self.isMoving = true;
		
		self.moveUe();
	}
	
	self.stop = function(){
		self.isMoving = false;
	}
	
	
	self.moveUe = function(){
		
		var checkPoints = self.getCheckPointsList();
		
		if(self.isMoving){
		
			loopFinished = false;
			
			ueToMove.gui.animate({
			  props: checkPoints,
			  time:1000, 
			  ease:"linear",
			  call:function(){loopFinished = true; if(self.loop){self.moveUe();}else{self.isMoving = false; refreshSidebar();}  }
			});
		}
		
	}
	
	self.getCheckPointsList = function(){
		
		var checkPoints = [];
		
		
		for(var i = 0; i < self.points.length; i++){
			
			var timeForDist = 0;
			if(i == 0){
				timeForDist = (dist(ueToMove.gui.x,ueToMove.gui.y,self.points[i].x, self.points[i].y))/0.2;
			}else{
				timeForDist = (dist(self.points[i].x, self.points[i].y,self.points[i-1].x, self.points[i-1].y))/0.2;
			}
			
			
			checkPoints.push({props:{x:self.points[i].x, y:self.points[i].y}, time: timeForDist});
		}
		
		return checkPoints;
		
	}
	
	
	
}