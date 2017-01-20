/************************************************************************/
/*	Name:        Rubén ignacio Couoh Ku.								*/
/*	Date:        12/01/2017												*/
/*	Description: Calcula la media y la desviación standar de una lista  */
/************************************************************************/

class RMath {
	
	constructor() 
	{
	}
	
	static toAverage(list)
	{		
		let node = list.begin();
		let	mean = 0;
		let	sum  = 0;
			
		if (!list.isEmpty) {
			while ( node !== null) {
				sum += node.value;
				node = node.next;
			}
		}		
		mean = sum / list.size;		
		return mean;
	}
	
	static computeStandardDeviation(list)
	{
		let mean = RMath.toAverage(list);
		let node = list.begin();
		let	sum  = 0;
		let	dev  = 0;
			
		if (!list.isEmpty) {
			while (node !== null) {
				let xi = node.value;
				sum += Math.pow(xi-mean, 2);
				node = node.next;
			}
			
			dev = Math.sqrt(sum/(list.size-1));
		}
		
		return dev;
	}	
}

module.exports = RMath;