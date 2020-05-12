Function.prototype.inherits = function(Parent) { // parent or Parent?
    const Surrogate = function() {};
    Surrogate.prototype = Parent.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

function MovingObject(name, speed, direction) {
    this.name = name;
    this.speed = speed;
    this.direction = direction;
}

MovingObject.prototype.accelerate = function() {
    this.speed += 1;
}


// CONSTRUCTOR IS BROKEN
function Ship(name, speed, direction, country) {
  MovingObject.call(this, name, speed, direction);
  this.country = country;
}

Ship.inherits(MovingObject); // Ship should inherit from MovingObject before monkeypatching Ship.prototype methods

Ship.prototype.boost = function(booster) {
    // debugger;
  this.speed += booster;
}

function Asteroid(name, speed, direction, metal) {
    MovingObject.call(this, name, speed, direction);
    this.metal = metal;
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.crash = function() {
  console.log(`${this.name} has crashed!`);
}

// const schoolBus = new MovingObject("School bus", 30, "south");
// schoolBus.accelerate();
// console.log(`${schoolBus.speed}`); // 31
// // schoolBus.crash(); // undefined method
// // schoolBus.boost(20); // undefined method

// Create instance of Ship
// Call instance methods and inherited methods on Ship
// Make sure instance methods don't work on Asteroid

// const xWing = new Ship("X-Wing", 100, "west", "Alliance to Restore the Republic");
// xWing.boost(1000);
// console.log(`${xWing.speed}`); // 1100
// xWing.accelerate();
// console.log(`${xWing.speed}`); // 1101
// // xWing.crash(); // undefined method
// console.log(Ship.prototype); // Ship prototype

// // Create instance of Asteroid

// const rock = new Asteroid("Rock", 9999, "down", "Tungsten");
// rock.accelerate();
// console.log(`${rock.speed}`); // 10000
// rock.crash(); // Rock has crashed!
// // rock.boost(40); // undefined method

console.log(`${(Ship.prototype.__proto__ === MovingObject.prototype)}`); // true