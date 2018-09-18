var logs = new Array();

function getShortLogsList(){
	
	var finalHtml = '';
	
	if(logs.length == 0){
		return finalHtml;
	}
	
	if(logs.length > 6){
		for( var i = logs.length - 6; i < logs.length; i++){
			finalHtml += getAlertDiv(logs[i]);
		}
	}else{
		for( var i = 0; i < logs.length; i++){
			finalHtml += getAlertDiv(logs[i]);
		}
	}
	
	return finalHtml;
	
}

function getFullLogsList(){
	
	var finalHtml = '';
	
	if(logs.length == 0){
		return "No logs collected";
	}
	
	for( var i = 0; i < logs.length; i++){
		
		finalHtml += getAlertDiv(logs[i]);
		
	}
	
	return finalHtml;
	
}

function getAlertDiv(logItem){

var logType = '<div class="alert ' + logItem[0] + '">';

var text ='<strong>' + logItem[2] + '</strong> ' + logItem[3]; 
		
return 	logType + text + '</div>';

}

function INFO(str){

	var fullDateFormat = getFullDateFormat();
	var currentTime = getCurrentTime();
	
	var logItem = ['alert-info',fullDateFormat,currentTime, str];
	
	logs.push(logItem);
}

function DANGER(str){

	var fullDateFormat = getFullDateFormat();
	var currentTime = getCurrentTime();
	
	var logItem = ['alert-danger',fullDateFormat,currentTime, str];
	
	logs.push(logItem);

}

function WARNING(str){

	var fullDateFormat = getFullDateFormat();
	var currentTime = getCurrentTime();
	
	var logItem = ['alert-warning',fullDateFormat,currentTime, str];
	
	logs.push(logItem);
}

function SUCCESS(str){
	
	var fullDateFormat = getFullDateFormat();
	var currentTime = getCurrentTime();
	
	var logItem = ['alert-success',fullDateFormat,currentTime, str];
	
	logs.push(logItem);
}

function getFullDateFormat(){

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var miliseconds = date.getMilliseconds();
	
	return '[' + year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + '.' + miliseconds + ']';

}

function getCurrentTime(){
	var date = new Date();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var miliseconds = date.getMilliseconds();
	
	return hour + ':' + minutes + ':' + seconds + '.' + miliseconds;
}

function refreshSidebar(){

	document.getElementById('sidebar').innerHTML = getActiveSettingsHtml();
	
	document.getElementById('logsShort').innerHTML = getShortLogsList();
	
}

$(function(){
  $('.custom-modal').click(function(e){
    e.preventDefault();
    var mymodal = $('#modalAllLogs');
    mymodal.find('.modal-body').html(getFullLogsList());
    mymodal.modal('show');
    
  });
})