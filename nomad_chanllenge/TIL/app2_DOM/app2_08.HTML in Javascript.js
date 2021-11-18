/* 3.1 HTML in Javascript */
console.log('<3.1 HTML in Javascript>');

// 웹브라우저 console에 다음과 같이 입력하면 id가 title인 태그의 코드 내용 가지고 오기.
document.getElementById("title"); // getElementById 라는 함수는 document 객체에 포함되어있고 HTML에서 Id 로 요소를 찾는 기능을 갖고 있다. 
// 웹브라우저 console에 입력한 것과 같은 결과
const title = document.getElementById("title");
console.log(title);

// id가 title인 태그의 속성 보기
console.dir(title);

// id가 title인 태그의 글자 수정하기
title.innerText = "GOT YOU"; //title은 위에 앞서 선언한 const 변수를 의미한다.

//id 표시
console.log(title.id); // 'title' 이라고 표시 됨.
//className 표시
console.log(title.className); // 'hi'라고 표시 됨.


/* 3.2 Searching For Elements */
console.log('<3.2 Searching For Elements>');

// (1)
// class name으로 get element 하기
const hellos = document.getElementsByClassName('hello');
console.log(hellos);
// getElementsByClassName를 사용하면 array 형태로 불러온다.
console.log(typeof(hellos));// 근데 왜 typeof로 보면 object라고 할까.
// Array이기 때문에 그냥 호출하면 안되고 index 번호를 붙여야 클래스이름을 불러올 수 있다.
console.log(hellos.className); //undefined -- 인덱스를 붙이지 않았기 때문에 undefined라고 표시 됨.
console.log(hellos[0].className); // hello -- 인덱스를 붙이니 제대로 클래스 이름이 나옴.

// (2) tag name으로 get element 하기
const getHello = document.getElementsByTagName('h3'); // h3 로 되어있는 모든 태그를 배열 형태로 가져올 수 있다.
console.log(getHello); //

// (3) querySelector로 get element 하기
// 배열이 아닌 객체로, 첫번째 요소만 불러옴!
// querySelector의 호출 방법 : css처럼 태그이름 앞에 .#등을 붙여주면 됨.
const getOneHello = document.querySelector('.hello2 h3'); // 위와는 달리 전체 h3 중에서 첫번째 요소만 불러온다. 또한 배열이 아닌 객체여서 메소드를 사용할 수 있다.
console.log(getOneHello);
console.log(typeof getOneHello); // object

// 객체니까 객체가 가지고 있는 method 사용해보기 - 본문의 내용 바꿔보기.
getOneHello.innerHTML = 'this is changed by querySelector of document object'; //적용이 잘 됨
getHello.innerHTML = 'this is changed by getElementsByTagName'; // 적용이 안됨.
//결과 : getHello는 getElementsByTagName 이라서(배열 되어 있으니까) 메소드가 실행이 안됨.

// querySelectorAll를 사용하면 배열로 요소를 불러옴.
const getAllHellos = document.querySelectorAll('.hello2 h3');
console.log(getAllHellos);
console.log(getAllHellos[0]);

// queryselector로 불러올 때 first-child 쓰면 특정해서 몇 번째 태그를 불러올 수 있음.
const getFirstHello = document.querySelector('.hello2 h3:first-child');
console.log('getFirstHello', getFirstHello);

/* 보통은 getElementsBy~ 보다 querySelector를 가장 많이 쓴다. */
