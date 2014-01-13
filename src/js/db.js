/**
 * a local storage wrapper
 */
function DB(_name) {
	if(typeof _name !== 'string' && _name !== '')
		throw new Error('Must give the name of the database');
	this.name = _name;

	this.length = function() {
		var count = 0;
		for (var i = 0; i < localStorage.length; i++) {
			if(localStorage.key(i).split(':')[0] === this.name) {
				count++;
			}
		}
		return count;
	};

	this.set = function(key, _data) {
		localStorage.setItem(this.name+':'+key, JSON.stringify(_data));
	};

	this.get = function(key, _default) {
		return localStorage.getItem(this.name+':'+key) !== null ? JSON.parse(localStorage.getItem(this.name+':'+key)) : _default;
	};

	this.clear = function() {
		for (var i = 0; i < localStorage.length; i++) {
			if(localStorage.key(i).split(':')[0] === this.name) {
				localStorage.removeItem(localStorage.key(i));
			}
		}
	};
}