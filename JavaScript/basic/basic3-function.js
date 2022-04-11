function sayHello(){
    console.log('Hello');
}
sayHello();


// object 의 속성 바꾸기.
function changeName(obj){
    obj.name = 'jane';
}
let iam = {name: 'jun', age: 20};
changeName(iam);
console.log(iam);

// default 값 지정하기.
function showMessage(message, from = 'unknown') {
    console.log(message, from);
}
showMessage('hello');

//배열 출력하기.
function printAll(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}
printAll('pear', 'apple', 'grape');

//배열 출력하기 2
function printAll2(...args) {
    for (const arg of args) {
        console.log(arg);
    }
}
printAll2('dog', 'cat', 'horse');

//배열 출력하기 3.
function printAll3 (...args) {
    args.forEach((arg) => console.log(arg));
}
printAll3('monitor', 'mouse', 'keyboard');






//function declaration (hoisting 가능 - 함수 선언하기 이전에 호출해도 된다.)
function sum(a,b){
    return a + b;
}
//function expression (hoisting 불가능)
const print = function () {
    console.log('print');
};

print(); // print

const printAgain = print;
printAgain(); // print

const sumAgain = sum;
console.log(sumAgain(1,3)); // 4






// callback function - 매개변수로 함수가 들어와 그 안에서 호출이 되는 경우
function randomQuiz(answer, printYes, printNo) {
    if (answer === 'love you') {
        printYes();
    }else {
        printNo();
    }
}

const printYes = function (){
    console.log('Yes');
}

const  printNo = function (){
    console.log('No');

}

randomQuiz('love you', printYes, printNo);





// arrow function 
const simplePrint = function(){
    console.log('simplePrint!');
}
const simplePrint2 = () => console.log('simplePrint2');


const add1 = function(a,b){
    return a + b;
}
const add2 = (a,b) =>  a + b;

simplePrint2();
console.log(add2(2,3));





// IIFE : Immediately Invoked Function Expression - ()괄호로 함수 묶으면 함수가 바로 호출 됨.
(function greeting (){
    console.log('hello');
})();



// calculate 계산기 만들기
function calculate (command, a, b) {
    if (command === 'add') {
        return a + b;
    }else if (command === 'substract') {
        return a - b ;
    }else if (command === 'divide') {
        return a / b ;
    }else if (command === 'multiply') {
        return a * b;
    }else if (command === 'remainder') {
        return a % b;
    }else {
        return '바르게 입력하세요.';
    }
}

function calculate2 (command, a, b) {
    switch (command) {
        case 'add':
            return a + b;
        case 'substract':
            return a - b;
        case 'divide':
            return a / b;
        case 'multiply':
            return a * b;
        case 'remainder':
            return a % b;
        default:
            throw Error('unknown command');
    }
}


console.log(calculate2('add', 2,3));
console.log(calculate2('substract', 2,3));
console.log(calculate2('multiply', 2,3));
console.log(calculate2('divide', 6,2));
console.log(calculate2('remainder', 6,2));
