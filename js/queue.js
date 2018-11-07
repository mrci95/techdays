function Queue(cell){
	
	var self = this;
	
	self.cell = cell;
	
	self.queue = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
	
	self.queuePlaces = new Array();
	
	self.queueElements = new Array(); 
	
	self.admissionQueueContainer = undefined;
	
	
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
	
	self.alreadyInQueue = function(ue, prio, queuedConnection){
		
		for( var i = 0; i < self.queue[prio].length; i++){
			
			if(self.queue[prio][i][0] == ue.id && self.queue[prio][i][2] == queuedConnection ){
				
				return true;
			}
		}
	}
	
	self.addToQueue = function(ue, prio, queuedConnection){
		if(self.usersInQueue() >= queueLength){
				WARNING('Queue full. UE: ' + ue.id + ' was not in the admission queue in Cell_' + self.cell.id + '(prio: '+ prio + ', connection: ' +  +')');
				return 'queueFull';
		}
		
		if(self.alreadyInQueue(ue, prio, queuedConnection)){
				WARNING('UE: ' + ue.id + ' already in the admission queue in Cell_' + self.cell.id + '(prio: '+ prio + ', connection: ' +  +')');
				return 'alreadyInQueue';
		}

		if(prio > highPrioParam && self.usersInQueue() > 0){
			return 'lowPrioReject';
		}
		
		var queuedUser = [ue.id, prio, queuedConnection ];
		
		self.queue[prio].push(queuedUser);
		
		SUCCESS('UE: ' + ue.id + ' was added to the admission queue with priority = ' + prio + ' for ' + queueingTypeToString(queuedConnection));
		
		if(self.usersInQueue() == 1){
				self.cell.showQueue();
		}
		
		self.addAdmissionQueueElement(ue, prio, queuedConnection);
		
		return 'queued';
		
	}
	
	self.removeFromQueue = function(ue, prio, queuedConnection){
		
		for( var i = 0; i < self.queue[prio].length; i++){
			
			if(self.queue[prio][i][0] == ue.id && self.queue[prio][i][2] == queuedConnection ){
				self.queue[prio].splice(i,1);
				zog(self.queue);
				
				var elementIndex = self.getQueueElementIndex(ue, prio, queuedConnection);
				
				zog(elementIndex);
				
				self.queueElements[elementIndex].hide();
				
				self.queueElements.splice(elementIndex,1); 
				self.updateElementsPosition();
				
				SUCCESS('UE: ' + ue.id + ' was removed from the admission queue');
				
				if(self.usersInQueue() < 1){
						setTimeout(function(){ if(self.usersInQueue() < 1){ self.cell.hideQueue(); } }, 5000);
				}
				
				return true;
			}
		}
		
		zog(self.queue);
		
		return false;
		
	}
	
	self.addAdmissionQueueElement = function(ue, prio, queuedConnection){
			
			var queueElement = new QueueElement(ue, prio, queuedConnection);
			
			queueElement.gui = new Container().addTo(self.admissionQueueContainer.parent);
			queueElement.gui.alp(0);
			
			queueElement.gui.pos(ue.gui.x,ue.gui.y);
			
			var elementType;
			if(queuedConnection == queueingType.PS){
				elementType = '#4286f4'
			}else{
				elementType = '#59b75d';
			}
			
			var queueElementShape =  new Circle(20, elementType);
			queueElementShape.addTo(queueElement.gui);// add the circle to the container and center
			queueElementShape.pos(0,0);
			
			var prioBcg = new createjs.Shape().set({x:0, y:0});
			queueElement.gui.addChild(prioBcg);
			prioBcg.graphics.f("white");
			prioBcg.graphics.moveTo(0,0)
			prioBcg.graphics.arc(0,0,20,0,180 * Math.PI/180);
			
			var queueElementUeId = new Label("UE"+ue.id,15,"black");
			queueElementUeId.addTo(queueElement.gui);
			queueElementUeId.pos(-12,-16);
			
			var queueElementPrio = new Label(prio,15,"black");
			queueElementPrio.addTo(queueElement.gui);
			queueElementPrio.pos(-4,3);
			
			queueElement.show();
			
			self.queueElements.push(queueElement);
			
			self.updateElementsPosition();
			
	}
	
	self.createQueuePlace = function(posx, posy, parentCandidate){
		var place = new QueuePlace();
		place.createQueuePlace(posx, posy, parentCandidate);
		
		self.queuePlaces.push(place);
		
	}
	
	self.getPlaceInQueue = function(ue, prio, queuedConnection){
		
		var placeInQueue = 0;
		
		for( var i = 0; i < self.queue.length; i++){
			zog("prio " + i + ", lenght: " + self.queue[i].length);
			for(var j = 0; j < self.queue[i].length; j++){
				
				if(self.queue[i][j][0] == ue.id && self.queue[i][j][1] == prio &&  self.queue[i][j][2] == queuedConnection){
					zog("place in queue for ue" + ue.id + ":" + placeInQueue);
					return placeInQueue;
				}
				placeInQueue++;
			}
		}
		
		return -1;
	}
	
	self.getQueueElementIndex = function(ue, prio, queuedConnection){
			for(var i = 0; i < self.queueElements.length; i++){
				if(self.queueElements[i].ue.id == ue.id && self.queueElements[i].prio == prio && self.queueElements[i].queuedConnection == queuedConnection){
					return i;
				}
			}
	}
	
	self.updateElementsPosition = function(){
		for(var i = 0; i < self.queueElements.length; i++){
			var placeInQueue = self.getPlaceInQueue(self.queueElements[i].ue, self.queueElements[i].prio, self.queueElements[i].queuedConnection);
			var targetPos = self.queuePlaces[placeInQueue].getGlobalPos();
			self.queueElements[i].moveToPlaceInQueue(targetPos.x,targetPos.y);
		} 
	}
	
	self.getFirsUserFromQueue = function(){
		
		for( var i = 0; i < self.queue.length; i++){
			
			if(self.queue[i].length != 0){
				
				return self.queue[i][0];
			}
		}
		
		return 'noUsersInQueue';
	}
	
}