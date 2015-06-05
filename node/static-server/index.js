var server = require('./server');
var route = require('./route');
var fs = require('fs');

server.start(route.route);

fs.createWriteStream("./pids", {
	flags: "a",
	encoding: "utf-8",
	mode: 0666
}).write(process.pid + "\n");