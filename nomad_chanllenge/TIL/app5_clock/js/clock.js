/* 5.0 Intervals */
// Interval 이용해서 2초마다 콘솔에 hello 출력하기.

const clock = document.querySelector('#clock');
clock.innerText = '00:00';

function sayHello(){
    console.log('hello');
}

//setInterval(sayHello, 1000); //1초 마다 sayHello() 함수가 실행됨.
//setTimeout(sayHello, 5000); //5초 뒤에 sayHello() 함수가 시작됨.

/* 5.1  Times and Dates*/

// 현재의 날짜와 시간에 대한 정보 불러오는 방법
const date1 = new Date();
date1.getDate();
date1.getDay(); //sun:0, mon:1, ... sat:6 요일마다 다른 숫자로 표시
date1.getFullYear();
date1.getHours();
date1.getMinutes();
date1.getSeconds();

new Date().getSeconds(); // 위와 같은 문장.


// html 화면에 시계 만들기
function getClock(){
    const date = new Date();
    clock.innerText = (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}
getClock(); // 창 열자마자 시계가 작동함. 여기에 이 함수 쓰지 않으면 1초 기다렸다가 실행이 됨.
setInterval(getClock, 1000);


/* 5.2 padStart */

// 함수 설명 - "1".padStart(2,"0") : "1"이라는 함수가 2개의 string이 될 수 있도록 앞에 0을 붙여주는 기능을 가짐
// "1".padEnd(2,"0") : 반대의 의미로 0이 뒤에 붇는 함수이다.
const xhello = "hello".padStart(20,"x"); // xxxxxxxxxxxxxxxhello
console.log(xhello);

// 숫자를 문자로 바꿔주는 작업 복습하기.
const numHours = new Date().getHours(); // number 반환
const wordHours = String(new Date().getHours()); // String 으로 변환

// 시계 만들기
const clock2 = document.querySelector('#clock2');

function getClock2(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock2.innerText = `${hours}:${minutes}:${seconds}`;

}
getClock2();
setInterval(getClock2, 1000);

