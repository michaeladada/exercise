var githubapi = require('./githubapi');

var githubStatusHistory = [];

exports.getStatus = function(callback) {
	githubapi.getGitStatus(function(data, response){
		if(hasStatusChanged(data)) {
			githubStatusHistory[githubStatusHistory.length] = data;
		}
		callback(data);
	});
}

function hasStatusChanged(data) {
	if(githubStatusHistory.length == 0) {
		return true;
	}
	if(data.status != githubStatusHistory[githubStatusHistory.length - 1].status) {
		return true;
	}
	return false;
}

exports.getStatusHistory = function() {
	return githubStatusHistory;
}