
const toDoForm = document.querySelector('#toDoForm'); //form
const inputToDo = toDoForm.querySelector('input'); // 할일 입력창
const toDoList = document.querySelector('#toDoForm+ul'); // 할일 입력 후 나열되는 곳.

const TODOS_KEY = 'todos'; // localStorage의 key
const toDos = []; // localStorage에 저장될 데이터들 모임.

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



/* 7.4  
String from localStorage into array in javascript object*/
// 
const savedToDos = localStorage.getItem(TODOS_KEY);

console.log('savedToDos', savedToDos); // savedToDos가 localStorage에 없다면 null이 표시

// forEach로 함수 호출하는 것에 대한 연습 (각각의 요소에 대해서 실행됨)
function sayHello(item){
    console.log('hello');
}
function sayHello2(item){
    console.log('this is the value of',item);
}


if (savedToDos) { // if(savedToDos)는 if(savedToDos !== null) 이라고 쓰는 것 과 같은 의미. savedToDos가 localStorage에 있다면..
    const parsedToDos = JSON.parse(savedToDos);
    console.log('parsedToDos', parsedToDos);
    /* JSON.parse 연습
    console.log(JSON.stringify([1,2,3,4])) // "[1,2,3,4]"
    console.log(JSON.parse("[1,2,3,4]")) // [1,2,3,4]

    JSON.parse(localStorage.getItem('todos')) // "["a", "b", "c"]"  --> ["a", "b", "c"] (changing from a just String into array.)
    */

    // forEach 이용해서 JSON.parse한 것을 가지고 (array 형태로 되어 있음) array에 있는 각각의 item에 대해서 함수 실행하게 하기
    
    // forEach 이용 (1)
    parsedToDos.forEach(sayHello); // localStorage의 todos에 요소가 3개 있다면 console에 hello가 3번 찍힘.
    
    // forEach 이용 (2)
    parsedToDos.forEach(sayHello2); // 'this is the value of a', 'this is the value of b', this is the value of c' 이렇게 각 요소마다 각자의 item을 끼고 출력됨.
    //sayHello2("a"), sayHello2("b"), sayHello2("c") 이렇게 연속으로 함수 실행하는 것 과 같다.
    
    // forEach 이용 (3) arrow function
    //함수를 사용하지 않고 다른 방법으로 요소 반복하기.
    parsedToDos.forEach((item) => console.log("this is the turn of", item)); // (2)와 같은 결과로 출력
    // 결국 함수를 만드는 방법은 두 가지임
    // 방식1. 화살표 함수
    (item) => console.log('this is the turn of',item);
    // 방식2. 일반 함수
    function sayHello(item){
        console.log('this is the turn of', item);
    }

}