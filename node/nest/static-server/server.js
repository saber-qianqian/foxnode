var http = require('http');

var start = function(route){
	http.createServer(function(res, req){
		route(res, req);
	}).listen(8887);

	console.log("Static server has started.");
}

exports.start = start;