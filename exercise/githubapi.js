var Client = require('node-rest-client').Client;
client = new Client();

exports.getGitStatus = function(callback) {
	client.get("https://status.github.com/api/status.json", function(data, response){
		callback(data);
	});
}
