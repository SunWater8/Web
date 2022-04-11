
// class with constructor
class Person {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    speak() {
        console.log(`${this.name} says hello`);
    }

}

const jane = new Person('jane', 12);
console.log(jane.name);
console.log(jane.age);
jane.speak();


//class with getter/setter
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value < 0 ? 0 : value;
    }
}

const user1 = new User('Maria', 'con', -2);
console.log(user1);