/*
Abstract class (simulated) -->
JS has no `abstract` keyword or pure virtual methods. We simulate it by:
1. Throwing an error in the constructor if someone tries `new Car()` directly.
2. Defining methods that throw "not implemented" errors, so if a child class
   forgets to override them, you get a runtime error instead of a compile error.
*/
class Car {
    constructor() {
        // new.target = the constructor actually invoked by `new`
        // If someone does `new Car()`, new.target === Car -> block it.
        // If someone does `new SportsCar()`, new.target === SportsCar -> allow it.
        if (new.target === Car) {
            throw new Error("Cannot instantiate abstract class Car directly.");
        }
    }

    startEngine() {
        throw new Error("Method 'startEngine()' must be implemented.");
    }
    shiftGear(gear) {
        throw new Error("Method 'shiftGear()' must be implemented.");
    }
    accelerate() {
        throw new Error("Method 'accelerate()' must be implemented.");
    }
    brake() {
        throw new Error("Method 'brake()' must be implemented.");
    }
    stopEngine() {
        throw new Error("Method 'stopEngine()' must be implemented.");
    }
}

/*
Concrete class -->
Same role as in C++: provides real implementation details.
`extends` = C++ `: public Car`
`super()` = must call the parent constructor (like Car's constructor logic
            runs first in C++ too, implicitly).
*/
class SportsCar extends Car {
    constructor(brand, model) {
        super(); // runs Car's constructor -> passes the new.target check
        this.brand = brand;
        this.model = model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
        this.currentGear = 0;
    }

    startEngine() {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} : Engine starts with a roar!`);
    }

    shiftGear(gear) {
        if (!this.isEngineOn) {
            console.log(`${this.brand} ${this.model} : Engine is off! Cannot Shift Gear.`);
            return;
        }
        this.currentGear = gear;
        console.log(`${this.brand} ${this.model} : Shifted to gear ${this.currentGear}`);
    }

    accelerate() {
        if (!this.isEngineOn) {
            console.log(`${this.brand} ${this.model} : Engine is off! Cannot accelerate.`);
            return;
        }
        this.currentSpeed += 20;
        console.log(`${this.brand} ${this.model} : Accelerating to ${this.currentSpeed} km/h`);
    }

    brake() {
        this.currentSpeed -= 20;
        if (this.currentSpeed < 0) this.currentSpeed = 0;
        console.log(`${this.brand} ${this.model} : Braking! Speed is now ${this.currentSpeed} km/h`);
    }

    stopEngine() {
        this.isEngineOn = false;
        this.currentGear = 0;
        this.currentSpeed = 0;
        console.log(`${this.brand} ${this.model} : Engine turned off.`);
    }
}

// Main
function main() {
    const myCar = new SportsCar("Ford", "Mustang"); // no "Car* myCar" typing — JS is dynamically typed
    myCar.startEngine();
    myCar.shiftGear(1);
    myCar.accelerate();
    myCar.shiftGear(2);
    myCar.accelerate();
    myCar.brake();
    myCar.stopEngine();
    // no delete needed — JS garbage collector reclaims myCar automatically
}

main();
