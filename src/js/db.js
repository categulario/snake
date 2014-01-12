function db(_name){
	this.name = _name;

	this.length = function(){
		return this.data.length;
	}

	this.set = function(_data){
		this.data.push(_data);
		var data_string = JSON.stringify(this.data);
		localStorage.setItem(this.name, data_string);
	}

	this.get = function(){
		var data_string = localStorage.getItem(this.name);
		return JSON.parse( data_string );
	}

	this.clear = function() {
		localStorage.setItem(this.name, null);
	}

	this.data = this.get() || [];
}

var clases = new db("clases");
var algo = new db("algo")

if(localStorage){
	clases.set( { hr:10, nombre:"mate2" } );
	algo.set( { hr:12, nombre:"espa" } );

	for(var i in clases.data ){
		console.log(clases.data[i]);
	}
}