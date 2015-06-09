var util = require("util");
var fs = require('fs');
var ejs = require('../../lib/ejs');

var Controller = function(){}

Controller.prototype = {
	render : render
	, setBaseR : setBaseR
}

function setBaseR(req, res, opt){
	this.req = req;
	this.res = res;
}

function render(htmlfile, data) {
	// 为啥是返回两个级而不是三个级？
	var view_file = '../../apps/views/'+htmlfile;

	if(fs.existsSync(view_file)){
		try{
			var htmlBody = ejs.render(htmlfile, data);
			this.res.writeHead(200, {"Content-Type": "text/html"});
		} catch(e) {
			console.log(e)
			this.res.writeHead(500, {"Content-Type": "text/html"});
			var htmlBody = '模板文件错误';
		}
	} else {
		this.res.writeHead(500, {"Content-Type": "text/html"});
		var htmlBody = '<p>未找到文件</p>';
	}

	this.res.write(htmlBody);
	this.res.end();
}

exports.__create = function(mod, controlFns) {
	util.inherits(mod, Controller);

	for(var k in controlFns) {
		mod.prototype[k] = controlFns[k]
	}

	return function(){
		return new mod;
		// console.log(new mod) ===> {} 为啥？
	}
}