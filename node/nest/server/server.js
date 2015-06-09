var http = require('http');
var url = require('url');

var start = function(route){
	http.createServer(function(req, res){
		var pathname = url.parse(req.url).pathname;
		console.log('Request for' + pathname + ' received.');

		route(req, res);
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;