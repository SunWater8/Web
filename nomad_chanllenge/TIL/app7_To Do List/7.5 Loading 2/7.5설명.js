
const toDoForm = document.querySelector('#toDoForm'); //form
const inputToDo = toDoForm.querySelector('input'); // 할일 입력창
const toDoList = document.querySelector('#toDoForm+ul'); // 할일 입력 후 나열되는 곳.

const TODOS_KEY = 'todos'; // localStorage의 key

 
//const toDos = []; // localStorage에 저장될 데이터들 모임.
// 7.5 - 2. 매번 새로고침 할 때마다 배열이 초기화 되면 안되기 때문에 (toDos 배열의 기본값은 비어 있는 배열임), 기존의 요소들을 저장하고 새로운 요소를 들어오게 하기 위해서 const를 let으로 변경해주기.
let toDos = [];

//localStorage에 저장하는 함수
function saveToDos() { 
    //localStorage.setItem(TODOS_KEY, toDos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // JSON.stringify() : 저장될 때 배열형식을 String 형식으로 바꿔주기
}

// to do 입력 후 입력박스 아래에 나열해주는 함수
function paintTodo(newTodo) {
    const li = document.createElement('li'); // <li> 태그 생성
    const span = document.createElement('span'); // <span> 태그 생성
    span.innerText = newTodo; // <span> </span> 태그 안에 새로 입력된 to do 넣어주기
    const button = document.createElement('button'); // <button>태그 생성
    button.innerText = '❌'; // <button> </button>태그 안에 특수기호 넣어주기.
    // delete one of the lists
    button.addEventListener('click', deleteTodo); // ❌버튼 눌렀을 때 그 to do 삭제하기.

    li.appendChild(span);  // <span>내용을 li에 붙이기
    li.appendChild(button); // <button> 내용을 li 에 붙이기
    toDoList.appendChild(li); // <li> 내용을 ul에 붙이기
}

// to do 삭제하는 함수
function deleteTodo(e) {
    //삭제할 li
    const li = e.target.parentElement;// 삭제버튼을 클릭한 요소를 선택
    li.remove(); // 
}

//submit을 하면 밑에 리스트에 표시됨. - 동작 과정 : 입력한 to do 값을 localStorage에 변수화 하여 배열의 요소로 저장을 하고, 입력 란을 초기화 시킴.
function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = inputToDo.value; // to do 입력란의 값을 변수화 하기
    inputToDo.value = ""; // 입력값 초기화 하기
    // saving to do (배열의 요소로 저장)
    toDos.push(newTodo); // push() : 배열의 요소로 저장
    paintTodo(newTodo); // paintTodo() 함수 호출
    saveToDos(); // saving in localStorage 함수 호출
}

toDoForm.addEventListener('submit', handleTodoSubmit);



/* 7.4 Loading To Dos 2
String from localStorage into array in javascript object*/
// 
const savedToDos = localStorage.getItem(TODOS_KEY);

//console.log('savedToDos', savedToDos); // savedToDos가 localStorage에 없다면 null이 표시

if (savedToDos) { // if(savedToDos)는 if(savedToDos !== null) 이라고 쓰는 것 과 같은 의미. savedToDos가 localStorage에 있다면..
    const parsedToDos = JSON.parse(savedToDos);

    /* 7.5 */
    // 7.5 - 2. 기존의 to do 를 새로고침 할 때마다 사라지지 않게 넣어주기.
    toDos = parsedToDos;
    // 7.5 - 1. 이미 만들어져 있는 함수 paintToDo를 불러오면 쉽게 기존에 저장되어 있는 배열의 to do 목록을 가져올 수 있음.
    parsedToDos.forEach(paintTodo); //  하지만 새로 to do 입력하면 새로 입력된 애들만 localStorage에 저장되고 기존의 배열 요소들은 또 사라짐. --> 해결 방법 : 배열 toDos를 const가 아닌 let으로 변경해주기

}