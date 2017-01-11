/**
 *	Rubén Ignacio Couoh Ku.
 **/

 var Node = require('./Node.js');
 
 class List {
	constructor() 
	{
		this.head = null;
		this.tail = null;
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
			let firstNode = this.head;			
			value = firstNode.value;
			
			if (this.head === this.tail) {
				this.head = this.tail = null;
			} else {
				this.head = this.head.next;
			}
			delete firstNode;
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
	
	toArray() 
	{
		let values = [];
		if (!this.isEmpty) {
			let tmp = this.head;
			
			while (tmp !== null) {
				value.push(tmp.value);
				tmp = tmp.next;
			}
		}
		
		return values;
	}
	
 }
 
 module.exports = List;