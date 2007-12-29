var fiz = {
	// Capture final item from css selector
	rx1: /[a-zA-Z#\.:-]*$/,

	// Isolate tag name from css selector
	rx2: /^[a-zA-Z]*/,

	// Match spaces, match periods, match child selector
	rx3: /\s/g, rx4: /\./g, rx5: /\s>\s/g,

	// Framework init
	init: function(){
		// Set element paths for quick queries
		this.setElementPaths();
	},

	setElementPaths: function(){
		// Set body path
		document.body.izPath = 'body';

		// Grab all tags in the entire dom
		var tags = document.body.getElementsByTagName('*');

		// Optimized loop iteration
		var i = tags.length, len = i;

		// Any tags?
		if(i > 0){ 
			// Loop through them
			do {
				// Set their paths
				this.setElementPath(tags[len-i]);
			}

			// I must be greater than 0 here
			while(--i);
		}
	},

	setElementPath: function(node){
		// Snag existing path
		var path = node.parentNode.izPath + ' ';

		// Add node
		path += node.nodeName.toLowerCase();

		// Node has an id?
		if(node.id) path += '#' + node.id;

		// Node has a class?
		if(node.className) path += "." + node.className.replace(this.rx3, '\.');

		// Path complete
		node.izPath = path;
	},

	// Creates a regex from a css selector
	rxFactory: function(selector){
		// Escape periods
		var expression = selector.replace(this.rx4, '\\.');

		// Fix child selectors
		expression = expression.replace(this.rx5, '\\s');

		// Replace spaces with .*\s
		expression = expression.replace(this.rx3,'\.\*\\s') + '[a-zA-Z#:\\.-]*$';
		
		// Return the regex
		return new RegExp(expression);
	},

	$: function(selector){
		// Snag the final item from the selector
		var tag = selector.split(' ');
		
		// Check for class or id
		var tag = this.rx2.exec(tag[tag.length-1]);

		// Grab tags
		var elements = document.getElementsByTagName(tag);

		// Create regex from selector
		var regex = this.rxFactory(selector);

		// Our result set and iterator
		var results = [], i = elements.length;

		// Any elements?
		if(i > 0){
			// Loop through them
			do {
				// Distill the iteration
				var element = elements[i-1];

				// Test the path against the regex
				if(regex.test(element.izPath)) results.push(element);
			}

			// Iterator must be > than 0 here
			while(--i);
		}

		// Send back the results
		return results;
	}
}