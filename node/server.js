var http = require('http');
var url = require('url');

var start = function(route){
	http.createServer(function(res, req){
		var pathname = url.parse(res.url).pathname;
		console.log('Request for' + pathname + ' received.');

		route(res, req);
	}).listen(8888);

	console.log("Server has started.");
}

exports.start = start;