/**
*	Rubén Ignacio Couoh Ku.
**/

class RMath {
	constructor() {	}
	
	static avg (list)
	{		
		let node = list.begin(),
			mean = 0,
			sum = 0;
			
		if (!list.isEmpty) {
			while ( node !== null) {
				sum += node.value;
				node = node.next;
			}
		}		
		mean = sum / list.size;		
		return mean;
	}
	
	static stdDev(list)
	{
		let mean = RMath.avg(list);
		let node = list.begin(),
			sum = 0,
			n = list.size,
			dev = 0;
			
		if (!list.isEmpty) {
			while ( node !== null) {
				let xi = node.value;
				sum += Math.pow(xi - mean, 2);
				node = node.next;
			}
			
			dev = Math.sqrt(sum/(n-1));
		}
		
		return dev;
	}	
}

module.exports = RMath;

