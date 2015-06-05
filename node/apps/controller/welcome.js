function index(res, req) {
	console.log("Request handler 'welcome' was called.");
	var data = {};
	data.hello = "hello";
	data.pageTitle = '<script>alert(1)</script>';
	data._CSSLinks = ['home', 'pages/main'];
	this.render(res, req, 'welcome.html', data);
}

exports.index = index;