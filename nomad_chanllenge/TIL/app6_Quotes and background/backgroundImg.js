const images = [ "1.jpg", "2.jpg", "3.jpg"];

const chosenImage = images[Math.floor(Math.random()*images.length)];
console.log(chosenImage);

//html 에 <img src="image/1.jpg"/> 와 같은 태그를 넣는 것과 같은 기능을 js에서 만들기.
const bgImage = document.createElement("img"); // img 태그 생성
bgImage.src = `images/${chosenImage}`; // img에 src 내용 생성
console.log(bgImage);

document.body.appendChild(bgImage); // body에 사진 넣기.
// body.appendChild() : body에서 마지막에 들어감. 
// body.prepend() : body에서 가장 위쪽에 들어감. 