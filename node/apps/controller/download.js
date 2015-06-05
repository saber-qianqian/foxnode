function index(res, req) {
	console.log("Request handler 'welcome' was called.");
	var data = {};
	data.hello = "hello";
	this.render(res, req, 'download.html', data);
}

exports.index = index;