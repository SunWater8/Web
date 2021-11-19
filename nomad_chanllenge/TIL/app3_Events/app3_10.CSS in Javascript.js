/* 3.6 CSS in Javascript */
console.log('<CSS in Javascript>');

// 글씨를 누를 때마다 두 가지 색이 번갈아 가면서 바뀌는 효과 만들기
const firstH2 = document.querySelector('.bye h2:first-child');
const secondH2 = document.querySelector('.bye h2:nth-child(2)');
console.log('first h2', firstH2);
console.log('second h2', secondH2);
// 색이 한 번만 변함
function handleTitleClick2(){
    console.log(firstH2.style.color); //콘솔창에는 뜨지 않음. 왜냐면 style을 준 것이 없으니까.
    firstH2.style.color = 'brown';
    console.log(firstH2.style.color); // 콘솔창에 brown이라고 뜸. 색을 설정한 후니까.
}
// 색이 번갈아가며 변함
function handleTitleClick3(){
    const currentColor = secondH2.style.color; // 코드 간결하게 하기.
    let newColor; // 바뀌게 될 새로운 색을 담기 위해 let 변수 사용.
    if(currentColor === 'powderblue'){
        newColor = 'salmon';
    }else{
        newColor = 'powderblue';
    }
    secondH2.style.color = newColor;
}

firstH2.addEventListener('click', handleTitleClick2);
secondH2.addEventListener('click', handleTitleClick3);

//if를 이용


/* 3.7 CSS in Javascript 2*/
console.log('<CSS in Javascript 2>');
// javascript에서 css를 직접 정해서 주는 게 아니라 css에서 정의해 놓은 효과를 javascript가 이어주도록 함.
// 효과 이벤트 내용 : p 글자를 클릭했을 때 색 변화 주기



// 1) className  이용하여 글자 클릭했을 때 글씨 색 바꾸기 
//- class가 하나만 적용되어 있을 때 유용? 클래스가 하나 이상 존재하고 있었을 때는 부적합
const p1 = document.querySelector('#sentences > p');
console.log('p1',p1);

function handleTextClick(){
    const clickedClass = 'textYellow'; //class 이름을 직접적으로 쓰면 오류가 발생했을 때 웹페이지의 console에서 오류 내역을 확인 받을 수 없으므로 변수를 하나 따로 만드는 것이 좋다.
   
    if(p1.className == ''){
        p1.className = clickedClass;
    }else{
        p1.className = '';
    }
    console.log(p1.className);
}
p1.addEventListener('click', handleTextClick);


/* 3.8 CSS in Javascript 3*/
console.log('<CSS in Javascript 3>');

// 2) classList 이용하여 글자 클릭했을 때 글씨 색 바꾸기
const p2 = document.querySelector('#sentences p:nth-child(2)');
console.log(p2);

function handleTextClick2(){
    const clickedClass = 'textYellow';
    if(p2.classList.contains(clickedClass)){
        p2.classList.remove(clickedClass);
    }else{
        p2.classList.add(clickedClass);
    }
    console.log(p2.className);
}
p2.addEventListener('click', handleTextClick2);

// 3) toggle 이용하여 글자 클릭했을 때 글씨 색 바꾸기

const p3 = document.querySelector('#sentences p:nth-child(3)');
console.log('p3', p3);

function handleTextClick3(){
    p3.classList.toggle('textYellow');
}

p3.addEventListener('click', handleTextClick3);