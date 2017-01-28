/************************************************************************/
/*	Name:        Rubén Couoh.											*/
/*	Date:        19/01/2017												*/
/*	Description: Contador de líneas de código							*/
/************************************************************************/

const FS       = require('fs');
const READLINE = require('readline');


/************************************************************/
/*	pattern filtra todos los comentarios cortos y largos	*/
/* 		Comentario corto: //								*/
/*   	Comentario largo: \/*... *\/						*/
/************************************************************/
let pattern = /^\s*\/{2,}|^\s*\/\*.*\*\/\s*$|^\s*.{0}\s*$/;

class LinesOfCodeCounter {

	/************************************************************************************************************/
	/*	Reuse Instructions																						*/
	/*		count(file, cb)																						*/
	/*		Purpose: 	 Cuenta las líneas de código del ${file}												*/
	/*		Limitations: NA																						*/
	/*		Return:		 Regresa un JSON {name: file, linesOfCode: linesOfCode} en la funcion callback.	        */
	/************************************************************************************************************/

	static count(file, cb)
	{
		let linesOfCode = 0;
		let summary = {};
		let rl = READLINE.createInterface({
			input: FS.createReadStream(file, 'utf-8')
		});
		
		rl.on('line', (line) => {
			//	Si no es comentario o línea en blanco la cuenta como línea de código.
			if (!pattern.test(line)) {
				linesOfCode++;
			}
			
		});
		
		rl.on('close', () => {
			summary = {name: file, linesOfCode: linesOfCode}
			cb(null, summary);
		});
	}
}

module.exports = LinesOfCodeCounter;