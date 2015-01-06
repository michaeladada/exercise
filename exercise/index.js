var express = require('express')
  , app = express()
  , github = require('./github');

app.use(express.static(__dirname + '/web'));

app.get('/status', function (req, res) {
	github.getStatus(function(data) {
		res.send(data);
	});
});

app.get('/history', function (req, res) {
	res.send(github.getStatusHistory());
});

app.listen(8000, function(){
  console.log('Express server listening on port 8000')
});