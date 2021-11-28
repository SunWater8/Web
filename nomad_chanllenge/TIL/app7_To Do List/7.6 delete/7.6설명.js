
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
 //7.6 - 3 이 함수의 매개변수 또한 text로 된 값이 아니라 object를 넣어서 실행되도록 해야 함. 그러기 위해서는 이 함수의 3번째 줄인 span 부분을 수정해주기.
function paintTodo(newTodo) {
    const li = document.createElement('li'); // <li> 태그 생성
    
    //7.6 - 4 배열 요소의 object의 id를 li 각각에 주도록 하기.
    //console.log(li.id == ""); // true --> li.id가 뭔지 확인하기 위해 작성. li.id는 현재 아무것도 쓰여있지 않고 있다. null도 아니고 undefined도 아닌 상태
    li.id = newTodo.id; // html에서 각각의 li에  다른 id가 생성됨.

    const span = document.createElement('span'); // <span> 태그 생성
    //span.innerText = newTodo; // <span> </span> 태그 안에 새로 입력된 to do 넣어주기
    //7.6 - 5 newTodo가 object이므로 그 안의 text를 불러와야 함.
    span.innerText = newTodo.text; // 
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
    console.log(li.id);
    li.remove(); // 
}

//submit을 하면 밑에 리스트에 표시됨. - 동작 과정 : 입력한 to do 값을 localStorage에 변수화 하여 배열의 요소로 저장을 하고, 입력 란을 초기화 시킴.
function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = inputToDo.value; // to do 입력란의 값을 변수화 하기
    inputToDo.value = ""; // 입력값 초기화 하기
    
    //7.6 - 1 // saving to do (배열의 요소로 저장).. 하는 것이 아니고 ! todo 삭제할 때를 위해 Object로 하여야 함.
    const newTodoObj = {
        text: newTodo,
        id:Date.now()
    };
    //7.6 - 2 // 배열에 저장하고 화면에 출력할 때 함수 호출에 쓰이는 매개변수를 모두 obj로 된 것으로 바꿔주기.
    toDos.push(newTodoObj); // push() : 배열의 요소로 저장 
    paintTodo(newTodoObj); // paintTodo() 함수 호출
    saveToDos(); // saving in localStorage 함수 호출
}

toDoForm.addEventListener('submit', handleTodoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) { // if(savedToDos)는 if(savedToDos !== null) 이라고 쓰는 것 과 같은 의미. savedToDos가 localStorage에 있다면..
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; // 기존의 localstorage의 데이터를 초기화 되어 비어있는 배열에 넣어주기.
    parsedToDos.forEach(paintTodo); // localStorage에 저장된  데이터들 화면으로 가져오기
}

/* 7.6 Deleting To Dos 1 */

//삭제하려면 배열의 요소 중에 어떤 것을 특정해서 가리켜야 하는데 지금의 상황에서는 그런 기능이 없으므로 배열을 다른 모양으로 꾸며가지고 id를 추가하도록 하여 해당 id를 가리키고 그 id의 내용을 지우도록 할 것이다.
//그러기 위해서는 모양은 [{id:121212, text:"dring"}] 이런식으로 보여지게 할 것! 고로 String이 아닌 Object로 되어 있어야 한다.

// Date.now()를 이용해서 random 한 숫자 불러오기.
// Date.now() --> 밀리초가 랜덤 숫자처럼 보이도록 호출된다.




/* 7.7 Deleting to Dos 2 */
// filter를 이용해서 배열에서 삭제하고자 하는 요소만 지우는 것이 아니라 그대로 기존의 배열은 두고 지우고 싶은 item을 제외하고 새 array를 만드는 방식으로 삭제처리를 할 것이다.

/* filter 연습 - console에서 입력해 볼 것.

//연습1. return true
function sexyFilter(){return true}

//배열의 요소들 각각에 sexyFilter라는 함수가 적용될 것임을 의미
[1, 2, 3, 4].filter(sexyFilter); // [1,2,3,4] --> 함수가 true를 반환하므로 전원 모두 무사히 유지되었다.(함수의 반환이 true면 배열의 요소가 모두 유지된다는 뜻이고, false를 반환하면 유지되지 않고 배열에서 그 요소가 제외된 새 배열을 만들어지게 됨)
//sexyFilter(1), sexyFilter(2), sexyFilter(3), sexyFilter(4) 이런 식의 함수가 배열의 요소에 각각 적용될 것임.


//연습2. return false
function sexyFilter(){ return false}
[1, 2, 3, 4].filter(sexyFilter); // [] --> 배열의 요소가 비어있음.

//연습3. sexyFilter가 호출 되었을 때 배열의 item이 3이 아니면 true를 return 하는 함수 만들기
function sexyFilter(item){return item !== 3} // 'item !=3' :  item이 1, 2, 4이면 true, item이 3일 때 true를 반환하게 됨.
[1, 2, 3, 4].filter(sexyFilter); // [1, 2, 4] --> 3이 제외된 채로 출력됨.

//연습4. string 가지고 해보기
const arr = ["pizza", "banana", "tomato"];
function sexyFilter(food){return food !== "banana"}
arr.filter(sexyFilter); // ["pizza", "tomato"]

//연습5. 1000보다 큰 수를 지워보기
const arr = [1234, 5454, 223, 122, 45, 6775, 334];
function sexyFilter(bigNum){return bigNum <= 1000}
arr.filter(sexyFilter);

//연습6. 실제 todos 배열을 가지고 해보기 - "a"의 id를 제외하여 배열 수정하기
const todos = [{text:"a", id= 1638114418921}, {text:"b", id:1638114419281}, {text: "c", id: 1638114419673}];
function sFilter(todo){return todo.id != 1638114418921}
todos.filter(sFilter);

//연습7. id가 아닌 text 가지고 배열 수정하기
const todoss = [{text:"blblbl"}, {text:"sososo"}];
function ssFilter(todo){return todo.text !== "blblbl"}
todoss.filter(ssFilter);

*/
