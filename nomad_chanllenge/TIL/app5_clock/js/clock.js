/* 5.0 Intervals */
// Interval 이용해서 2초마다 콘솔에 hello 출력하기.

const clock = document.querySelector('#clock');
clock.innerText = '00:00';

function sayHello(){
    console.log('hello');
}

setInterval(sayHello, 1000);
setTimeout(sayHello);
