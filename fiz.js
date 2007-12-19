var fiz = {
	// Nabs final item from selector
	rx1: /([a-zA-Z#\.]*)$/,

	// Isolate tag name in selector
	rx2: /[\.#]/,

	// Match all spaces
	rx3: /\s/g,

	// Match all periods
	rx4: /\./g,

	// Match child selector
	rx5: /\s>\s/g, 

	// Framework initialization
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
		if(i>0){ 
			// Loop through them
			do {
				// Set their paths
				this.setElementPath(tags[len-i]);
			}

			// i must be greater than 0 here
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

		/*//////////////////////////
		Attach psuedo classes
		//////////////////////////*/
		
		/*
		var sib = node;
		
		// Loop through previous siblings...
		do(sib = sib.previousSibling);
		
		// In search of an element
		while(sib && sib.nodeType != 1);
		
		// No previous siblings, add :first-child
		if(!sib) node.izPath += ":first-child";
		*/
	},

	// TODO: create regex from css selector
	rxFactory: function(selector){
		// return expression
	},

	$: function(selector){
		// Snag the final item from the selector
		var tag = this.rx1.exec(selector)[0];
		
		// Check for class or id
		var index = tag.search(this.rx2);

		// Strip them off if they exist
		if(index > 0) tag = tag.substr(0, index);

		// Grab tags
		var elements = document.getElementsByTagName(tag);

		// Escape periods
		var expression = selector.replace(this.rx4, '\\.');

		// Fix child selectors
		expression = expression.replace(this.rx5, '\\s');

		// Replace spaces with .*\s
		expression = expression.replace(this.rx3,'\.\*\\s') + '[a-zA-Z#:\\.-]*$';

		// Compile the regex
		var regex = new RegExp(expression);
		
		// Create regex from selector
		//var regex = rxFactory(selector);

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