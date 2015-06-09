var fs = require('fs');
var ejs = require('../lib/ejs');

function render (res, req, htmlfile, data) {
	var view_file = '../../apps/views/'+htmlfile;
	if(fs.existsSync(view_file)){
		// console.log(data, 'render show data')
		try{
			var htmlBody = ejs.render(htmlfile, data);
			req.writeHead(200, {"Content-Type": "text/html"});
		} catch(e) {
			console.log(e)
			req.writeHead(500, {"Content-Type": "text/html"});
			var htmlBody = '模板文件错误';
		}
		
	} else {
		req.writeHead(500, {"Content-Type": "text/html"});
		var htmlBody = '<p>未找到文件</p>';
	}
	req.write(htmlBody);
	req.end();
}

exports.render = render;