const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

const btn = document.querySelector('button');

// button을 클릭하면 background color가 랜덤으로 바뀜
function handleClickBtn (){
  // 랜덤으로 두 색상 선택하기
  const chosenColor1 = colors[Math.floor(Math.random()*colors.length)];
  const chosenColor2 = colors[Math.floor(Math.random()*colors.length)];
  // console.log(chosenColor1, chosenColor2);
  
  //HTML의 <body style="background : linear-gradient(90deg, blue, red)"> 와 같은 효과 주기"
  document.body.style.background = `linear-gradient(90deg, ${chosenColor1}, ${chosenColor2})`;
}

btn.addEventListener('click', handleClickBtn);