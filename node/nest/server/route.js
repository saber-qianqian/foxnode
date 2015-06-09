var fs = require('fs');
var url = require('url');
var render = require('./render');
var controller = require('./base/controller');
global.render = render.render;
global.controller = controller;

function route(req, res) {
	var handle = getController(req);
	if(handle){
		var controllerFn = require(handle.controller_road)['__create']();
		controllerFn.setBaseR(req, res);
		controllerFn[handle.method](handle.args)
	} else {
		console.log('No resuest handler found for ' + handle.method);

		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.end('not assign.');
	}
}
//url 解析
// 找到渲染页面的函数

function getController(req){
	var pathString = url.parse(req.url, true).pathname;
	pathString = pathString.slice(1);
	var pathA = pathString.split('/');
	var urlRoute = {}
	var controller_road = '../../apps/controller/';
	var method = '';
	var args = '';
	var lp = pathA.length;

	// console.log(pathA)
	// console.log(lp)
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

	var controller_file = controller_road + '.js';
	if(fs.existsSync(controller_file)){
		return {
			controller_road : controller_road
			, method : method
			, args : args
		};
	}
	return false;
}

exports.route = route;