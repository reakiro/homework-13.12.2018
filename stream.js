var http = require('http');
var fs = require('fs');
var port = 3000;

var wsfile = fs.createWriteStream('demo.txt');

for (var i = 0; i < 10000; i++) {
	wsfile.write('hello ');
}

http.createServer(function(req, res) {
	if (req.url == '/stream') {
		var rsfile = fs.createReadStream('demo.txt');
		rsfile.pipe(res);
	} 
	if (req.url == '/file') {
		fs.readFile('demo.txt', function(err, data) {
			res.write(data);
		})
	}
	//res.end();
}).listen(port);