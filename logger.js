var Event = require('events').EventEmitter;
var readline = require('readline');

var event = new Event();

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

event.on('login', function() {
	console.time('your login time');
});

event.on('logout', function() {
	console.timeEnd('your login time');
});

rl.question('please enter username: ', function(ans) {
	console.log('hello ' + ans + '!\nyou are logged now!');
	event.emit('login');
	var repeatQuestion2 = function() {
		rl.question('do you want to log out? y/n\n', function(ans) {
			if (ans == 'y') {
				console.log('logout succesfull.')
				event.emit('logout');
				rl.close();
			} 

			if (ans == 'n') {
				repeatQuestion2();
			} 

			if (ans != 'y' && ans != 'n') {
				console.log('couldn\'t read \'' + ans + '\'. please choose of y/n.');
				repeatQuestion2();
			}
		});
	}
	repeatQuestion2();
});

