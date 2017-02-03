/************************************************************************/
/*	Name:        Rubén ignacio Couoh Ku.								*/
/*	Date:        12/01/2017												*/
/*	Description: Calcula la media y la desviación standar de una lista  */
/************************************************************************/

class RMath {
	
	constructor() 
	{
	}
	
	
	/********************************************************************************************/
	/*	Reuse Instructions																		*/
	/*		toAverage(list)																		*/
	/*		Purpose: 	 Calcula la media de un conjunto de datos recibidos de list.			*/
	/*		Limitations: NA																		*/
	/*		Return:		 Regresa un numero real.										        */
	/********************************************************************************************/
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

	/********************************************************************************************/
	/*	Reuse Instructions																		*/
	/*		computeB1(listX, listY)																*/
	/*		Purpose: 	 Calcula el parámetro B1 de la regresión lineal listX y listY.			*/
	/*		Limitations: NA																		*/
	/*		Return:		 Regresa un numero real.										       	*/
	/********************************************************************************************/
	static computeB1(listX, listY)
	{
		let n = listX.size;
		let Xavg = RMath.toAverage(listX);
		let Yavg = RMath.toAverage(listY);
		let	B1  = 0;
		let sumXiYi = 0;
		let sumXiXi = 0;
		
		for (let Xi = listX.begin(), Yi = listY.begin(); Xi !== null; Xi = Xi.next, Yi = Yi.next) {
			sumXiYi += Xi.value * Yi.value;
			sumXiXi += Math.pow(Xi.value, 2);
		}
		
		B1 = (sumXiYi - n * Xavg * Yavg) / (sumXiXi - n * Math.pow(Xavg, 2));
		
		return B1;
	}
	
	/************************************************************************************************/
	/*	Reuse Instructions																			*/
	/*		computeB0(listX, listY, B1)																*/
	/*		Purpose: 	 Calcula el parámetro B0 de la regresión lineal listX y listY y B1.			*/
	/*		Limitations: NA																			*/
	/*		Return:		 Regresa un numero real.										        	*/
	/************************************************************************************************/
	static computeB0(listX, listY, B1)
	{
		let Xavg = RMath.toAverage(listX);
		let Yavg = RMath.toAverage(listY);
		let B0 = 0;
		
		B0 = Yavg - B1 * Xavg;
		
		return B0;
	}
}

module.exports = RMath;