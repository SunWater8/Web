/* 7.0 Setup */
const toDoForm = document.querySelector('#toDoForm');
const inputToDo = toDoForm.querySelector('input');
const toDoList = document.querySelector('#toDoForm+ul');

//
const TODOS_KEY = 'todos';
// localStorage에 저장될 데이터들 모임.
const toDos = [];

/* 7.3 Saving to dos */
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));


    /*  JSON에 대해서  - console에 써보면서 확인 가능*/
    console.log(toDos); // (3) ['as', 'sd', 'df']
    console.log(JSON.parse(localStorage.getItem('todos')));// (3) ['as', 'sd', 'df']

    console.log(localStorage.getItem('todos')); //  '["as","sd","df"]'
    console.log(JSON.stringify(toDos)); // '["as","sd","df"]'
    console.log(localStorage.getItem('todos')); //  '["as","sd","df"]'
}

/* 7.1 Adding ToDos */
function paintTodo(newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = newTodo;
    const button = document.createElement('button');
    button.innerText = '❌';
    // delete one of the lists
    button.addEventListener('click', deleteTodo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

/* 7.2 Deleting ToDos */
function deleteTodo(e) {
    //삭제할 li
    const li = e.target.parentElement;
    li.remove();
}

//submit을 하면 밑에 리스트에 표시됨.
function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = inputToDo.value;
    inputToDo.value = "";

    // saving to do (배열의 요소로 저장)
    toDos.push(newTodo);

    paintTodo(newTodo);
    saveToDos();
}

toDoForm.addEventListener('submit', handleTodoSubmit);
