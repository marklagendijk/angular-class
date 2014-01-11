# angular-class
An Angular service for creating classes with inheritance. Exposes the `Class` service.

## API
### Class
The Class service.

#### Class.extend(classDefenition)
Defines a new Class.

##### classDefenition.init
The contructor method

##### classDefinition.*
Other class methods

#### Inside any class method
##### this
The instance.

##### this._super
The current method on the first ancestor which has this method.

##### this.*
Any class method or property.

## Example usage
The functionality of the `Class` service is best explained by some examples.
``` javascript
//Creates the 'MyModels' module, which requires the 'Class' module
angular.module('MyModels', ['Class'])
	//The Animal ModelClass, uses the 'Class' service
	.factory('Animal', function(Class){
		return function(){
		 	var Animal = Class.extend({
				init: function(){
					this.isAlive = true;
					this.age = 0;
					this.color = null;
				},
				canWalk: function(){
					return this.isAlive;
				},
				canFly: function(){
					return this.isAlive;
				},
				passYear: function(){
					this.age++;
				}
			});

			return Animal;
		}
	})
	//The Hamster ModelClass, uses the 'Animal' ModelClass service
	.factory('Hamster', function(Animal){
		var Hamster = Animal.extend({
			init: function(){
				this._super();
				this.color = 'brown';
			},
			canFly: function(){
				return false;
			},
			passYear: function(){
				this._super();
				if(this.age > 2){
					this.isAlive = false;
				}
			}
		});

		return Hamster;
	});

// A controller, which uses both the ModelClasses
myApp.controller('MyController', function(Animal, Hamster){
	var tweety = new Animal();
	tweety.passYear();
	tweety.passYear();
	tweety.passYear();
	//tweety instanceof Class === true
	//tweety instanceof Animal === true
	//tweety.canFly() === true
	//tweety.isAlive === true

	var knaagie = new Hamster();
	knaagie.passYear();
	knaagie.passYear();
	//knaagie.isAlive === true
	knaagie.passYear();
	//knaagie.isAlive === false
	//knaagie instanceof Class === true
    //knaagie instanceof Animal === true
    //knaagie instanceof Hamster === true
    //knaagie.canFly() === false
});
```

## Running the tests
1. Get the source code.
2. `npm install`
3. `bower install`
4. `gulp test`

## Credits
- Original author: John Resig. See [the original blog post](http://ejohn.org/blog/simple-javascript-inheritance/).
- This Angular wrapper package: Mark Lagendijk

