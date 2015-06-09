var controlFns = {
	index : function(params){
		var data = {};
		data.hello = "hello";
		data.pageTitle = '<script>alert(1)</script>';
		data._CSSLinks = ['home', 'pages/main'];
		this.render('welcome.html', data);
	},
	main : function(){
		var data = {};
		data.hello = "hello";
		data.pageTitle = 'main';
		data._CSSLinks = ['home', 'pages/main'];
		this.render('welcome.html', data);
	}
};
function welcome(){
	return this;
}

exports.__create = controller.__create(welcome, controlFns);