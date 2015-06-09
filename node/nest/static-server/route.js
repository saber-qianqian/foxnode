var fs = require('fs');
var url = require('url');
var less = require('less');

function route(req, res) {
	var filename = req.url;
	if(filename.indexOf('.css')>0){
		var lessFile = '../../apps/static/less'+filename.replace('css', 'less')

		if(fs.existsSync(lessFile)){
			fs.readFile(lessFile, 'utf8', function(err, file){
				var lessOptions = {
					paths: ['.', '../../apps/static/less'],
					compress: true
				};
				less.render(file, lessOptions, function (e, css) {
					if(!e){
						res.writeHead(200, {'Content-Type' : 'text/css'});
						res.write(css.css);
						res.end();
					} else {
						console.log('file:'+lessFile, e.message)
						res.writeHead(404, {'Content-Type' : 'text/plain'});
						res.write('file: '+lessFile + '\n' + 'errorMsg: ' + e.message);
						res.end();
					}
				});
			});
		} else {
			if(fs.existsSync('../../apps/static/css'+filename)){
				res.writeHead(200, {'Content-Type' : 'text/css'});
				fs.createReadStream('../../apps/static/css'+filename).pipe(res);
			} else {
				res.writeHead(404, {'Content-Type' : 'text/plain'});
				res.write('can not find file: '+filename);
				res.end();
			}
		}
	} else if(filename.indexOf('.js')>0){
		res.writeHead(200, {'Content-Type' : 'application/javascript'});
		fs.createReadStream('../../apps/static/javascript'+filename).pipe(res);
		// console.log('Javascript static file resuire');
	} else {
		console.log('No found for ' + filename);
		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.write('404 Not found!');
		res.end();
	}
}

exports.route = route;