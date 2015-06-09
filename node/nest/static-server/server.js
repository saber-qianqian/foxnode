var http = require('http');

var start = function(route){
	http.createServer(function(req, res){
		route(req, res);
	}).listen(8887);

	console.log("Static server has started.");
}

exports.start = start;