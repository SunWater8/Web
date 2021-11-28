
const toDoForm = document.querySelector('#toDoForm'); //form
const inputToDo = toDoForm.querySelector('input'); // 할일 입력창
const toDoList = document.querySelector('#toDoForm+ul'); // 할일 입력 후 나열되는 곳.

const TODOS_KEY = 'todos'; // localStorage의 key
let toDos = []; // localStorage에 저장될 데이터들 모임. 새로고침 할 때마다 초기화 되지 않고 기존의 데이터를 가져오게 하기 위해 let을 사용.

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


const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) { // if(savedToDos)는 if(savedToDos !== null) 이라고 쓰는 것 과 같은 의미. savedToDos가 localStorage에 있다면..
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; // 기존의 localstorage의 데이터를 초기화 되어 비어있는 배열에 넣어주기.
    parsedToDos.forEach(paintTodo); // localStorage에 저장된  데이터들 화면으로 가져오기
}