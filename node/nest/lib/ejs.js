var fs = require('fs');
var ejsFn = require('./ejsFn');
var cache = {};

function readFile(file){
	return fs.readFileSync(file, encoding='utf8');
}

var clearCache = function(){
	cache = {};
};

/**
 * Parse the given `str` of ejs, returning the function body.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
var strParse = function(filename){
	var open = '<%'
		,end = '%>'
		,fnStr = '';

	var str = readFile(gitFile(filename));

	var strA = str.split(open);

	function getValue(str){
		return str.split(end);
	}

	fnStr += 'var tpl="' + strEscape(strA[0]) + '";';
	strA.forEach(function(data, index){
		if(index == 0) return;
		var value = getValue(data);
		switch(data.slice(0, 1)){
			case '#' :
				compile(value[0].replace('#', '').trim());
				fnStr += 'tpl+=this[\"' + value[0].replace('#', '').trim() + '\"](_data, ejsFn) + "' + strEscape(value[1]) + '";';break;
			case '=' :
				fnStr += 'tpl+=' + value[0].replace('=', '').replace('this', '_data').trim() + '+"' + strEscape(value[1]) + '";';break;
			case '!' :
				fnStr += 'tpl+=ejsFn.html_encode(' + illStrEscape(value[0].replace('!', '').replace('this', '_data').trim()) + ');tpl+="' + strEscape(value[1]) + '";';break;
			default :
				fnStr += value[0].replace('this', '_data').trim() + 'tpl+="' + strEscape(value[1].replace('this', '_data').trim()) + '";';
		}
	});
	fnStr += 'return tpl;';
	return fnStr;
};

var gitFile = function(filename){
	return '../../apps/views/' + filename;
}

var strEscape = function(str){
	return str
		.replace(/"/g, '\\\"')
		.replace(/'/g, '\\\'')
		.replace(/\t/g, '\\t')
		.replace(/\n/g, '\\n');
}

var illStrEscape = function(str){
	return str
		.replace(/&(?!\w+;)/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/**
 * Compile the given `str` of ejs into a `Function`.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Function}
 * @api public
 */

var compile = function(filename){
	listenToChange(filename);
	// console.log('	compile file: '+filename);
	if(!cache[filename]){
		var tpl = strParse(filename);
		// console.log(tpl)
		cache[filename] = new Function('_data, ejsFn', tpl);
	}
	return cache[filename];
};

var listenToChange = function(filename){
	// console.log('listenToChange: '+filename+'\n=================')
	function onChg(prev) {
		if (prev == 'change'){
			delete cache[filename];
			compile(filename);
		}
	}

	fs.watch(gitFile(filename), {persistent: true, interval: 1000}, onChg);
}

var render = function(filename, data){
	console.log(filename)
	if(!cache[filename]) compile(filename);
	console.log(cache[filename])
	return cache[filename](data, ejsFn);
};

exports.render = render;