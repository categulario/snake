test("Database tests", function() {
	ok(DB, 'The database object');
	throws(function(){var db = new DB()}, 'The creation requires a string argument');
	ok(new DB('foo'), 'a valid creation');
	var db = new DB('foo');

	db.set('var', ['lo']);
	deepEqual(db.get('var'), ["lo"], 'Set a value');

	deepEqual(db.get('jonas', []), [], 'Retrieve with a default');

	db.clear();
	strictEqual(db.length(), 0, 'Database emptyness');
	strictEqual(db.get('var'), undefined, 'The created values must not exists');
});