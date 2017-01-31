/************************************************************************/
/*	Name:        Rubén ignacio Couoh Ku.								*/
/*	Date:        11/01/2017												*/
/*	Description: Lista ligada simple.   								*/
/************************************************************************/

 var Node = require('./Node.js');
 
 class List {
	 
	constructor() 
	{
		this.head = null;
		this.tail = null;
	}
	
	begin () 
	{
		let first = this.head;
		return first;
	}
	
	end () 
	{
		let last = this.tail;
		return last;
	}
	
	get isEmpty() 
	{
		return this.head === null;
	}
	
	push(value) 
	{		
		let newNode = new Node(value, null);
		
		if (this.isEmpty) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = this.tail.next;
		}
	}
	
	pop() 
	{
		let value = null;
		if (!this.isEmpty) {
			let newFirst = this.head.next;			
			value = this.head.value;
			
			if (this.head === this.tail) {
				delete this.head;
				this.head = this.tail = null;
			} else {
				delete this.head;
				this.head = this.newFirst;
			}
		}		
		return value;
	}
	
	peek() 
	{
		let value = null;
		if (!this.isEmpty) {			
			value = this.head.value;
		}
		
		return value;
	}
	
	
	get size()
	{
		let count = 0;
		if (!this.isEmpty) {
			let tmp = this.head;
			
			while (tmp !== null) {
				count++;
				tmp = tmp.next;
			}
		}
		
		return count;
	}	
 }
 
 module.exports = List;