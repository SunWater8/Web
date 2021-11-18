/* 3.0 The Document Object */
// javascript에서 html을 읽을 수 있다. (수정, 추가, 삭제는 추후에 배울 예정)
console.log('<the Document object>');

// 웹브라우저에서의 console 에다가 'console.dir(document)'라고 입력해서 확인해도 됨.
console.dir(document); //document가 자바스크립트의 시선에서 html을 바라봤을 때 정리한 내용을 담고 있다.
console.log(document); // html 내용이 들어 있음.

//웹브라우저에서의 console 에다가 (2)
// document.title = 'Hi' 라고 치면 html의 title이 바뀜. (하지만 저장되지는 않음. 저장하려면 이 파일에서처럼 js 파일 안에다 입력해야 함.)
// title은 console.dir(document) 라고 쳤을 때 document 객체 모음집에 들어 있던 property 중 하나이다. 즉 document.title 이라는 것은 document 객체안에 있는 title이라는 property의 값을 호출한 격이 됨.
document.title = 'Hi';

// body의 내용만 가져와 보기
console.log(document.body);

