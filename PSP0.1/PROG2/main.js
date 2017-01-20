/************************************************************************/
/*	Name:        Rubén Couoh.											*/
/*	Date:        19/01/2017												*/
/*	Description: Programa utilizado para contar las lineas de código	*/
/************************************************************************/

const GLOB     = require('glob');
const FS       = require('fs');
const READLINE = require('readline');

/****************************************************/
/*	pattern encuentra todos los mentarios del tipo	*/
/* 		Comentario corto: //						*/
/*   	Comentario largo: \/*... *\/				*/
/****************************************************/
let pattern = /^\s*\/{2,}|^\s*\/\*.*\*\/\s*$|^\s*.{0}\s*$/;


/****************************************************************************************/
/*	Reuse Instructions																	*/
/*		getFiles(folder, extensions, cb);												*/
/*		Purpose: 	 Obtiene las lista de nombres de diferentes							*/
/*				 	 tipos archivos que se encuentran en una carpeta.					*/
/*		Limitations: NA																	*/
/*		Return:		 Regresa un arreglo con los nombres de los archivos de la carpeta.	*/
/****************************************************************************************/
function getFiles(folder, extensions, cb) 
{
	let files = '*.+({extensions})'.replace('{extensions}', extensions.join('|'));
	let pattern = '{folder}/{files}'
					.replace('{folder}', folder)
					.replace('{files}', files);
	
	GLOB(pattern, cb);
}

/************************************************************************************************************/
/*	Reuse Instructions																						*/
/*		countLinesOfCode(file, cb)																			*/
/*		Purpose: 	 Cuenta las líneas de código del ${file}												*/
/*		Limitations: NA																						*/
/*		Return:		 Regresa un JSON {name: file, linesOfCode: linesOfCode} en la funcion callback.	        */
/************************************************************************************************************/
function countLinesOfCode(file, cb)
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

/****************************************************************************************/
/*	Reuse Instructions																	*/
/*		printSummary(folder, summaries);												*/
/*		Purpose: 	 Imprime en la consola un resúmen del total de líneas de código.	*/
/*		Limitations: NA																	*/
/*		Return:		 Regresa undefined.													*/
/****************************************************************************************/
function printSummary(folder, summaries)
{
	let linesOfCode = 0;
	console.log();
	console.log('*****************************************************');
	console.log(`*\tPrograma: ${folder}`);
	summaries.forEach((summary) => {
		linesOfCode += summary.linesOfCode;
		console.log(`*\t${summary.name}:\tLOC ${summary.linesOfCode}`);
	});
	console.log('*****************************************************');
	console.log(`*\t\tTotal LOC:\t${linesOfCode}`);
	console.log('*****************************************************');
}


(function main() 
{
	//	Carpeta donde se encuentra el programa
	let folder = './../../PSP0/PROG1';
	//let folder = './../../PSP0.1/PROG2';
	
	// Tipos de archivos en los cuales se desean contar las líneas de código.
	// Pueden existir archivos e configuración que no se desean contar.
	let extensions = ['js'];
	
	getFiles(folder, extensions, (err, files) => {
		if (err) {
			console.error(err);
			return;
		}
		countLinesOfCodeByFile(files, processSumaries);
		
	});
	
	function countLinesOfCodeByFile(files, cb)
	{
		let remaining = files.length;
		let summaries = [];
		
		files.forEach(function (file) {
			countLinesOfCode(file, (err, summary) => {
				if (err) {
					console.log(err);
				}
				summaries.push(summary);
				if (--remaining === 0) {
					cb(summaries);
				}
			});
		});
	}
	
	function processSumaries(summaries)
	{
		printSummary(folder, summaries);
	}
})();