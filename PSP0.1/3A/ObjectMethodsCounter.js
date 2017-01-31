/************************************************************************/
/*	Name:        Rubén Ignacio Couoh Ku.								*/
/*	Date:        26/01/2017												*/
/*	Description: Contador de métodos de objeto. 						*/
/************************************************************************/

const FS   = require('fs');
const PATH = require('path');


/************************************************************/
/*	pattern filtra las firmas de los metodos				*/
/* 		example: static main(arg1, arg2)					*/
/*   	example: count(arg1, arg2)							*/
/************************************************************/

let pattern = /\s*[A-Za-z]*\s*(_?[A-Za-z0-9]+\s*\(\s*([A-Za-z]+\,\s*)*\s*[A-Za-z]*\s*\))(?=\s*\r\n\s*{\s*)/g;

class ObjectMethodsCounter {

	/************************************************************************************************/
	/*	Reuse Instructions																			*/
	/*		count(file, cb)																			*/
	/*		Purpose: 	 Cuenta los métodos de una clases.		 									*/
	/*		Limitations: NA																			*/
	/*		Return:		 Regresa un JSON {name, numberOfMethods} en la función callback.			*/
	/************************************************************************************************/
	
	static count(file, cb)
	{
		FS.readFile(file, 'utf-8', (err, content) => {
			let name = '';
			let numberOfMethods = 0;
			let summary = {};	
			if (err) {
				
				console.error(err);
			} else {
				let matches = content.match(pattern);
				
				// Descarta todas las funciones.
				let found   = matches.filter((match) => {
					
					return !match.includes('function');
				});
				
				numberOfMethods = found ? found.length : 0;
			}
			
			name = PATH.basename(file, '.js');
			summary = {name, numberOfMethods};
			cb(null, summary);
		});
	}
}

module.exports = ObjectMethodsCounter;