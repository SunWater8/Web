/* 변수 const & let*/
console.log('<const and let>');
const a = 5;
const b = 2;
const c = "2";

console.log(a + b);
console.log(a - b);
console.log(a + c);

/* const와 다르게 let은 변수 데이터를 업데이트 할 수 있다. 
두 개를 다른 용도로 사용함으로써 어떤 의도로 쓰려는지 알 수 있다.
var는 초기 자바스크립트 만들 때 사용되던 변수인데 제한을 구분하는 기능이 없기 때문에 지금은 쓰이지 않는다.
새로 업데이트 되어서 만들어진 const, let만이 사용되고 있다. 
기본적으로 const가 사용되고 변수의 내용이 업데이트 될 수 있다면 let을 사용한다.*/

//c = "3"; //오류 피하기 위해 주석 처리
console.log(c);

let d = "hello";
console.log(d);

d = "bye";
console.log(d);


