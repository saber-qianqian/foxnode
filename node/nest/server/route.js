var fs = require('fs');
var url = require('url');
var render = require('./render');
global.render = render.render;

function route(req, res) {
	// global.req = req;
	// global.res = res;
	var pathname = getController(req).pathname;
	var handle = getController(req);
	if(typeof handle === 'function'){
		return handle(req, res);
	} else {
		console.log('No resuest handler found for ' + pathname);

		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.end('not assign.');
	}
}
//url 解析
// 找到渲染页面的函数

function getController(res){
	var pathString = url.parse(res.url, true).pathname;
	pathString = pathString.slice(1);
	var pathA = pathString.split('/');
	var controller_road = '../../apps/controller/';
	var method = '';
	var args = '';
	var lp = pathA.length;

	if(lp > 3){
		for(var i = 0, k = lp - 3; i < k; i++){
			controller_road += pathA[i] + '/';
		}
		controller_road += pathA[i];
		i += 1;
		method = pathA[i] || 'index';
		args = pathA[i+1] || '';
	} else {
		controller_road += pathA[0];
		method = pathA[1] || 'index';
		args = pathA[2] || '';
	}
	console.log(method)
	var controller_file = controller_road + '.js';
	if(fs.existsSync(controller_file)){
		console.log(require(controller_road)[method], '/n controller')
		return require(controller_road)[method];
	}
	return false;
}

exports.route = route;