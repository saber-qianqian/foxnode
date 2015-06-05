function index(res, req) {
	req.writeHead(200, {"Content-Type": "text/html"});
	var htmlBody = '<!DOCTYPE html>'+
					'<html lang="en">'+
					'<head>'+
					'<meta charset="UTF-8">'+
					'<title>Add</title>'+
					'</head>'+
					'<body>'+
					'<h1>welcome</h1>'+
					'<h2>yun qian</h2>'+
					'</body>'+
					'</html>';
	req.write(htmlBody);
	req.end();
}

exports.index = index;