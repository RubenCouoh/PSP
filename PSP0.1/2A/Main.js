/************************************************************************/
/*	Name:        Rubén Couoh.											*/
/*	Date:        19/01/2017												*/
/*	Description: Programa utilizado para contar líneas de código		*/
/************************************************************************/

const GLOB    = require('glob');
const FS      = require('fs');
const COUNTER = require('./LinesOfCodeCounter.js');

class Main {
	
	static _getFilesByExtension(folder, extensions, cb)
	{
		let files = '*.+({extensions})'.replace('{extensions}', extensions.join('|'));
		let pattern = '{folder}/{files}'
						.replace('{folder}', folder)
						.replace('{files}', files);
		
		GLOB(pattern, cb);
	}

	static _printSummary(folder, summaries) 
	{
		let linesOfCode = 0;
		console.log('\n*****************************************************');
		console.log(`*\tPrograma: ${folder}`);
		summaries.forEach((summary) => {
			linesOfCode += summary.linesOfCode;
			console.log(`*\t${summary.name}:\tLOC ${summary.linesOfCode}`);
		});
		console.log('*****************************************************');
		console.log(`*\t\tTotal LOC:\t${linesOfCode}`);
		console.log('*****************************************************');
	}
	
	static main() 
	{
		//	Carpeta donde se encuentra el programa
		let folder = './../../PSP0/1A';
		//let folder = './../../PSP0.1/2A';
		
		// Tipos de archivos en los cuales se desean contar las líneas de código.
		// Pueden existir archivos e configuración que no se desean contar.
		let extensions = ['js'];
		
		Main._getFilesByExtension(folder, extensions, (err, files) => {
			
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
			
			files.forEach(function (file) 
			{
				COUNTER.count(file, (err, summary) => {
					
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
			Main._printSummary(folder, summaries);
		}
	}	
}


Main.main();
