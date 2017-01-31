/****************************************************************************************/
/*	Name:        Rubén Ignacio Couoh Ku.												*/
/*	Date:        26/01/2017																*/
/*	Description: Programa utilizado para contar líneas de código y número de metodos.	*/
/****************************************************************************************/

const GLOB           = require('glob');
const FS             = require('fs');
const PATH           = require('path');

const LINESCOUNTER   = require('./LinesOfCodeCounter.js');
const METHODSCOUNTER = require('./ObjectMethodsCounter.js');

class Main {
	
	static _getFilesByExtension(folder, extensions, cb)
	{
		let files = '*.+({extensions})'.replace('{extensions}', extensions.join('|'));
		let pattern = '{folder}/{files}'
						.replace('{folder}', folder)
						.replace('{files}', files);
		
		GLOB(pattern, cb);
	}

	static _printSummary(header, summaries) 
	{
		let linesOfCode = 0;
		console.log();
		console.log('************************************************************************');
		console.log(`*\tPrograma: ${header}`);
		
		console.log('************************************************************************');
		
		summaries.forEach((summary) => {
			linesOfCode += summary.linesOfCode;
			console.log(`*\t${summary.name}\t# Methods ${summary.numberOfMethods}\t# LOC ${summary.linesOfCode}`);
			console.log('************************************************************************');
		});
		
		console.log(`*\t\t\tTotal LOC:\t${linesOfCode}`);
		console.log('************************************************************************');
	}
	
	static main() 
	{
		//	Carpeta donde se encuentra el programa
		//let folder = './../../PSP0/1A';
		//let folder = './../../PSP0.1/2A';
		let folder = './../../PSP0.1/3A';
		let header = PATH.basename(folder);
		// Tipos de archivos en los cuales se desean contar las líneas de código.
		// Pueden existir archivos e configuración que no se desean contar.
		let extensions = ['js'];
		
		Main._getFilesByExtension(folder, extensions, (err, files) => {
			if (err) {
				console.error(err);
				return;
			}
			countLineOfCodeAndNumberMethodsByFile(files, processSumaries);
			
		});
		
		function countLineOfCodeAndNumberMethodsByFile(files, cb)
		{
			let remaining = files.length;
			let summaries = [];
			
			if (files.length) {
				
				files.forEach(function (file) {
					
					LINESCOUNTER.count(file, (err, linesSummary) => {
						
						if (err) {
							console.log(err);
						}
						
						METHODSCOUNTER.count(file, (err, methodsSummary) => {
							
							if (err) {
								console.log(err);
							}
							let summary = {};
							
							Object.assign(summary, linesSummary, methodsSummary);
							summaries.push(summary);
							
							if (--remaining === 0) {
								cb(summaries);
							}
						});
					});
				});
			} else {
				
				cb(summaries);
			}
		}
		
		function processSumaries(summaries)
		{
			Main._printSummary(header, summaries);
		}
	}
}

Main.main();