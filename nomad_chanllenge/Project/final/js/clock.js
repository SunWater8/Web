const clock = document.querySelector('#clock');

// 현재의 날짜와 시간에 대한 정보 불러오는 방법
const date = new Date();

// html 화면에 시계 만들기
function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    
}
getClock(); // 창 열자마자 시계가 작동함. 여기에 이 함수 쓰지 않으면 1초 기다렸다가 실행이 됨.
setInterval(getClock, 1000);

