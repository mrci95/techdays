
var ERICSSON_BLUE = "#032564"
var WHITE = "#D2D2D2"
var cellArray = new Array();
var ueGuiContainer = new Container();
var ueArray = new Array();

var editMobilityBehaviorUe = undefined;
var mobilityBehaviorUe

const connectionType = {
    EULHS: 'int_eul_hs',
    SPEECH: 'speech_12_2',
    SPEECHEULHS: 'int_eul_hs_speech_12_2',
};

const queueingType = {
	PS: 'ps',
	SPEECH: 'speech'
};

const queueLength = 10;


const cellRange = 250;
const queuingTime = 9090;


function getCellById(id){
	var noOfCells = cellArray.length;
	for(var i = 0; i<noOfCells; i++)
	{
		if(cellArray[i].id == id)
		{
			return cellArray[i];
		}
	}
	return undefined;
}

function getUeById(id){
	
	var noOfUEs = ueArray.length;
	for(var i = 0; i<noOfUEs; i++)
	{
		if(ueArray[i].id == id)
		{
			return ueArray[i];
		}
	}
	return undefined;
}