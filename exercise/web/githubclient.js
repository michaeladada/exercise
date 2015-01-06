
angular.module('app', []).controller('Github', function Github($scope, $http) {
    
	var READABLE_DATE_FORMAT = "yyyy/MM/dd HH:mm";
	var GITHB_DATE_FORMAT = "yyyy-MM-ddTHH:mm:ssZ";
	
	$http.get('http://localhost:8000/status').
        success(function(data) {
            $scope.github = data;
        });
	
	$scope.getStatusClass = function(status) {
		if(status == "good") {
        	return "success";
        } else if(status == "minor") {
        	return "warning";
        } else if(status == "major") {
        	return "error";
        }
	}
	
    
    $http.get('http://localhost:8000/history').
	    success(function(data) {
	    	
	    	changeDatesForView(data);
	        $scope.availability = data;
	    });
    
    function changeDatesForView(data) {
    	for(var i = 0; i < data.length - 1; i++) {
    		var date = getReadableDateFormat(data[i].last_updated);
    		var nextDate = getReadableDateFormat(data[i + 1].last_updated)
    		data[i].last_updated = date + " - " + nextDate;
    	}
    	
    	if(data.length > 0) {
    		data[data.length - 1].last_updated = getReadableDateFormat(data[data.length - 1].last_updated) + " - now";
    	}
    }
    
    function getReadableDateFormat(date) {
    	return Date.parseExact(date, GITHB_DATE_FORMAT).toString(READABLE_DATE_FORMAT);
    }
});	