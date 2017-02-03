/************************************************************************/
/*	Name:        Rubén ignacio Couoh Ku.								*/
/*	Date:        11/01/2017												*/
/*	Description: Lista ligada simple.   								*/
/************************************************************************/

 var Node = require('./Node.js');
 
 class List {
	 
	constructor(values=[]) 
	{
		this.head = null;
		this.tail = null;
		this._size = 0;
		
		for (let value of values) {
			this.push(value);
		}
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
		return this._size === 0;
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
		
		this._size = this._size + 1;
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
			
			this._size = this._size - 1;
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
		return this._size;
	}	
 }
 
 module.exports = List;