/************************************************************************/
/*	Name:        Rubén ignacio Couoh Ku.								*/
/*	Date:        11/01/2017												*/
/*	Description: Calcula la media y la desviación standar				*/
/************************************************************************/
 
const readline = require('readline');
const fs = require('fs');

const List = require('./List.js');
const RMath = require('./RMath.js');

class Main {
	
	static main() 
	{
		let io = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		console.log('  ****************************');
		console.log('  *** Entradas disponibles ***\n  ***      1) Teclado.     ***\n  ***      2) Archivo.     ***\n  ****************************');

		io.question('  Selecione una opción > ', onInput);

		function onInput(input) 
		{
			input = Number.parseInt(input);
			
			switch (input) {
				case 1: 
					io.question('  Ingresa los números separados por un [espacio] >', onResponse);
				break;
				case 2: 
					io.question('  ¿Cuál es el nombre del archivo? > ', onResponse);
				break;
				default:
					console.log(' Opción incorrecta!');
					process.exit(0);
				break;
			}	
			
			function onResponse(response) 
			{
				io.close();
				readValues(input, response);
			}
			
		}

		function readValues(input, param) 
		{
			let values = [];
			
			if (input === 1) {
				
				values = param.split(' ').map((value) => { return Number.parseFloat(value)});
				
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
					values = data.split('\n').map((value)=>{ return Number.parseFloat(value)});
				}
				cb(err, values);
			});
		}

		function onValues(err, values) 
		{
			if (err) {
				process.exit(0);
			}
			
			var list = new List();
			for (let value of values) {
				list.push(value);
			}	
			
			let mean = RMath.toAverage(list);
			let standardDeviation = RMath.computeStandardDeviation(list);
			
			console.log(`\n  Mean: ${mean.toFixed(2)}\n  Standard Deviation: ${standardDeviation.toFixed(2)}`);
		}
	}

}

Main.main();