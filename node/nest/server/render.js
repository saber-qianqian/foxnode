var fs = require('fs');
var ejs = require('../lib/ejs');

function render (req, res, htmlfile, data) {
	var view_file = '../../apps/views/'+htmlfile;
	if(fs.existsSync(view_file)){
		// console.log(data, 'render show data')
		try{
			var htmlBody = ejs.render(htmlfile, data);
			res.writeHead(200, {"Content-Type": "text/html"});
		} catch(e) {
			console.log(e)
			res.writeHead(500, {"Content-Type": "text/html"});
			var htmlBody = '模板文件错误';
		}
		
	} else {
		res.writeHead(500, {"Content-Type": "text/html"});
		var htmlBody = '<p>未找到文件</p>';
	}
	res.write(htmlBody);
	res.end();
}

exports.render = render;