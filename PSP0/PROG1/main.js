/**
 *	Rubén Ignacio Couoh Ku.
 **/
 
const readline = require('readline');
const fs = require('fs');

let List = require('./List.js');

let io = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('****************************');
console.log('*** Entradas disponibles ***');
console.log('***      1) Teclado.     ***');
console.log('***      2) Archivo.     ***');
console.log('****************************');

io.question('Selecione una opción > ', onInput);

function onInput(input) 
{
	rl.close();
	
	input = Number.parseInt(input);
	switch (input) {
		case 1: 
			io.question('Ingresa los números separados por un [espacio] >', onResponse);
		break;
			io.question('¿Cuál nombre del archivo? >', onResponse);
		case 2: 
		break;
		default:
			console.log('Opción incorrecta!');
			process.exit(0);
		break;
	}	
	
	function onResponse(response) {
		readValues(input, response);
	}
	
}

function readValues(input, param) 
{
	let values = [];
	if (input === 1) {
		values = param.split(' ').map((value) => {return Number.parseFloat(value)});
		onValues(null, values);
	} else if (input === 2) {
		values = readFile(param, onValues);
	}	
}

function readFile(file, cb) 
{
	fs.readFile(file, 'utf-8', (err, data) => {
		let values = [];
		if (!err) {
			values = data.split('\n').map((value)=>{ return Number.parseFloat(Number)});
		}
		cb(err, values);
	});
}

function onValues(err, values) 
{
	if (err) {
		console.log(err);
		process.exit(0);
	}
	
	var list = new List();
	for (value of values) {
		list.push(value);
	}
	
	
	
}

