/* globals: beforeEach, describe, it, module, inject, expect */
describe('angular-class instances', function(){
    var Class, Animal, Hamster, tweety, knaagie;

    beforeEach(module('Class'));
    beforeEach(inject(function(_Class_){
        Class = _Class_;

        Animal = Class.extend({
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

        Hamster = Animal.extend({
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

        tweety = new Animal();
        knaagie = new Hamster();
    }));

    describe('when being created', function(){
        it('should have run the init (constructor) method', function(){
            expect(tweety.isAlive).toBe(true);
            expect(tweety.age).toBe(0);
            expect(knaagie.color).toBe('brown');
        });

        it('should have run the init method of the ancestor class, when _super is called', function(){
            expect(knaagie.isAlive).toBe(true);
            expect(knaagie.age).toBe(0);
        });
    });

    it('should be an instanceof Class', function(){
        expect(tweety instanceof Class).toBe(true);
        expect(knaagie instanceof Class).toBe(true);
    });

    it('should be an instanceof its ancestor classes', function(){
        expect(knaagie instanceof Hamster).toBe(true);
    });

    it('should have the specified methods available', function(){
        expect(tweety.canWalk()).toBe(true);
        expect(tweety.canFly()).toBe(true);
    });

    it('should have non-overridden ancestor methods available', function(){
        expect(knaagie.canWalk()).toBe(true);
    });

    it('should override ancestor methods', function(){
        expect(knaagie.canFly()).toBe(false);
    });

    it('should run the ancestor method, when _super is called', function(){
        knaagie.passYear();
        knaagie.passYear();
        knaagie.passYear();
        expect(knaagie.age).toBe(3);
        expect(knaagie.isAlive).toBe(false);
    });
});