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
		console.log('  ***  Cálculo de B0 y B1  ***');
		console.log('  ****************************');
		console.log('  *** Ejecución de pruebas ***');
		console.log('  ***       1) test1.      ***');
		console.log('  ***       2) test2.      ***');
		console.log('  ***       3) test3.      ***');
		console.log('  ****************************');

		io.question('  Selecione una opción > ', onInput);

		function onInput(input) 
		{
			let file = null;
			
			input = Number.parseInt(input);
			switch (input) {
				case 1:
				case 2:
				case 3:
					file = `test${input}.txt`;
					readFile(file, onValues);
				break;
				default:
					console.log('¡Opción incorrecta!');
					process.exit(0);
				break;
			}
			io.close();
		}

		function readFile(file, cb) 
		{
			fs.readFile(file, 'utf-8', (err, content) => {
				let data = { X: [], Y: []};
				let lines = [];
				
				if (!err) {
					
					lines = content.split('\r\n');
					data = lines.reduce((result, line) => {
						let pair = line.split(' ');
						result.X.push(Number.parseFloat(pair[0]));
						result.Y.push(Number.parseFloat(pair[1]));
						return result;
					}, data);
				}
				
				cb(err, data);
			});
		}

		function onValues(err, data)
		{
			if (err) {
				process.exit(0);
			}
			
			var listX = new List(data.X);
			var listY = new List(data.Y);
			
			let B1 = RMath.computeB1(listX, listY);
			let B0 = RMath.computeB0(listX, listY, B1);
			
			console.log(`\n\tB0: ${B0.toFixed(2)}`);
			console.log(`\tB1: ${B1.toFixed(4)}`);
		}
	}

}

Main.main();