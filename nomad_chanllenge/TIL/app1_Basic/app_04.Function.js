console.log('<function>');

/* 2.7 Function part 1. */
// arguments가 없는 function 
function sayHello(){
    console.log("Hello my name is Cin");
}
sayHello();

/* 2.8 function part 2. */
// argument가 있는 function
function sayHello2(a){
    console.log("Hello my name is "+ a);
}

sayHello2("nave");

// argument가 여러개 있는 function
function sayHello3(nameOfPerson, age){
    console.log("Hello, my name is "+ nameOfPerson +" and I am "+ age +" years old now");
}
sayHello3("sarn", 20);

// Object 안에서 function
const player2 = {
    name : "navam",
    sayHello4 : function(){ //argument가 있는 function
        console.log("hello!");
    },
    sayHello5 : function(otherPersonOfName) {
        console.log("Hello, " + otherPersonOfName + "!");
    }
};

console.log(player2.name);
player2.sayHello4();
player2.sayHello5("synn");

/* 2.10 Recap 2 */
// function cares about only first argument
function minusFive(potato) {
    console.log(potato - 5);
}
minusFive(5, 2, 1, 12, 45, 71, 6);

console.log("<calculator>");
// calculator function in an Object
const calculator = {
    add: function(a, b){
        console.log(a+b);
    },
    minus: function(a, b){
        console.log(a-b);
    },
    multiply: function(a, b){
        console.log(a*b);
    },
    divide: function(a, b){
        console.log(a/b);
    },
    powerOf: function(a, b){
        console.log(a**b);
    },
};
calculator.add(1,2);
calculator.minus(2,1);
calculator.multiply(2,3);
calculator.divide(4,2);
calculator.powerOf(2,3);