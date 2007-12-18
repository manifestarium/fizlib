var IZ = {
	// Nabs final item from selector
	rx1: /([a-zA-z#\.]*)$/,

	// Isolate tag name in selector
	rx2: /[\.#]/,

	// Match all spaces
	rx3: /\s/g,
	
	// Match all periods
	rx4: /\./g,

	// IZ initialization
	init: function(){
		// Set element paths for quick queries
		this.setElementPaths();
	},

	setElementPaths: function(){
		// Set body path
		document.body.izPath = "body";

		// Grab all tags in the entire dom
		var tags = document.body.getElementsByTagName("*");

		// Optimized loop iteration
		var i = tags.length, len = i;

		// Any tags?
		if(i>0) { 
			// Loop through them
			do {
				// Set their paths
				this.setElementPath(tags[len-i]);
			}

			// i must be greater than 0 here
			while (--i);
		}
	},

	setElementPath: function(node){
		// Snag existing path
		var path = node.parentNode.izPath + " ";

		// Add node
		path += node.nodeName.toLowerCase();

		// Node has an id?
		if(node.id) path += "#" + node.id;

		// Node has a class?
		if(node.className) path += "." + node.className.replace(this.rx3, '\.');

		// Path complete
		node.izPath = path;
	},

	$: function(selector){
		// Snag the final item from the selector
		var tag = this.rx1.exec(selector)[0];

		// Nab the tag name
		tag = tag.substr(0, tag.search(this.rx2));

		// Grab tags
		var elements = document.getElementsByTagName(tag);

		// Escape periods
		var expression = selector.replace(this.rx4, '\\.');

		// Replace spaces with .*\s
		expression = expression.replace(this.rx3,'\.\*\\s') + "$";

		// Compile the regex
		var regex = new RegExp(expression);

		// Our result set and iterator
		var results = [], i = elements.length;

		// If there are any elements
		if(i > 0) {
			// Loop through them
			do {
				// Distill the iteration
				var element = elements[i-1];

				// Test the path against the regex
				if(regex.test(element.izPath)) results.push(element);
			}

			// Iterator must be > than 0 here
			while (--i);
		}

		// Send back the results
		return results;
	}
}