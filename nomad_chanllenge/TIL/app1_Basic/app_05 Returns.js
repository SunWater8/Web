/*2.12 Returns' recap */
console.log("<Returns>");

//return 으로 값을 반환한 후에 return 뒤에 이어지는 코드는 실행되지 않는다. 
const calculator2 = {
    add : function (a, b) {
        return a+b;
        console.log("hello"); // return 뒤에 이어지는 코드이므로 실행되지 않았다.
    }
};

calculator2.add(1,2);