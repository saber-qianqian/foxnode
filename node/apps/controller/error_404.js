function index(res, req) {
	console.log("Request handler 'welcome' was called.");
	var data = {};
	this.render(res, req, '404.html', data);
}

exports.index = index;