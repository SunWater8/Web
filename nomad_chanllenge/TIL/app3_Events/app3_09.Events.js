/* 3.3 Events */
console.log('<3.3 Events>');

// 첫 번째 h1에 스타일 변화 주기
// 먼저 캐스팅하기
const title = document.querySelector('.hello:first-child h1');
console.log(title); // 적절히 캐스팅 했는지 보기
console.dir(title); //element의 내부 보기
// 색 입히기
title.style.color = 'blue';

// 이벤트 넣어서 클릭할 때 글자 색 바뀌게 하기. 함수 이용함.
// 주의 할 점 : 함수를 run할 때 ()를 뒤에 붙이지 않는다. 

function handleTitleClick(){
    title.style.color = 'red';
}
title.addEventListener('click', handleTitleClick); 
// addEventListener란 자바스크립트가 event를 감지(listen)한다는 의미이다.
// 메소드의 인수로는 이벤트 이름과 이벤트로 실행시킬 동작(함수)로 구성된다.


/* 3.4 Events 2 */
console.log('<3.4 Events 2>');

// 함수를 이용한 또다른 event 예
// 마우스를 올렸다 땠을 때 두 가지의 event 만들어 보기

function handleMouseEnter() {
    title.innerHTML = 'mouse in';
}
function handleMouseLeave() {
    title.innerHTML = 'mouse leave';
}

title.addEventListener('mouseenter', handleMouseEnter);
title.addEventListener('mouseleave', handleMouseLeave);



/* 3.5 more Events  */
console.log('<3.5 more Events >');

// addEventListener 가 아니라 on을 붙인 event로 이벤트 실행해보기
const title2 = document.querySelector('.hello h1:nth-child(2)'); //두 번째 h1 요소 불러오기
console.log(title2); // 잘 불러왔는지 확인
title2.style.color = 'green';
//이벤트에 적용할 함수 만들고 이벤트 실행시키기
function handleTitleClick2() {
    title2.style.color = 'grey';
}
title2.onclick = handleTitleClick2;

// document가 아닌 window 객체에 이벤트 적용시키기 - 웹페이지의 창 사이즈를 줄이거나 늘리면 배경색이 노락색로 됨.
function handleWindowResize() {
    document.body.style.backgroundColor = 'rgb(235, 235, 235)'; // document.다음에는 body나 title, head만 올 수 있다. 다른 하위 요소들은 (div, h1 등) querySelector와 같은 메소드를 통해서만 불러올 수 있다.
}
window.addEventListener('resize', handleWindowResize);

// 더 다양한 window 객체의 이벤트 실행해 보기 (1) - 복사하려 할 때(ctrl+c) alert 띄우기 
// 더 다양한 window 객체의 이벤트 실행해 보기 (2) - 인터넷이 끊기거나 켜졌을 때 alert 띄우기
function handleWindowCopy() {
    alert('Copier');
}
function handleWindowOffline() {
    alert('You need to TURN ON your Wifi NOW');
}
function handleWindowOnline() {
    alert('Connected Wifi now');
}
window.addEventListener('copy', handleWindowCopy);
window.addEventListener('offline', handleWindowOffline);
window.addEventListener('online', handleWindowOnline);