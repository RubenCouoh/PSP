const readline = require('readline');
rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('?\n', (r) => {
	console.log('resp', r);
	rl.write('Resp' + r);
	rl.close();
});

rl.on('line', (line) => {
	console.log('line', line);
});


rl.write(null, {ctrl: true, name: 'u'});

rl.write('Delete this');
// Simulate Ctrl+u to delete the line written previously
rl.write('!Seleccione la fuente de datos!\n1) Consola.\n 2) Archivo');
rl.write(null, {ctrl: true, name: 'l'});
