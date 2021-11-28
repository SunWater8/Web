const toDoForm = document.querySelector('#toDoForm');
const inputToDo = toDoForm.querySelector('input');
const toDoList = document.querySelector('#toDoForm+ul');

/* 7.1 Adding ToDos */
function paintTodo(newTodo){
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
function deleteTodo(e){
    //삭제할 li
    const li = e.target.parentElement;
    li.remove();
}

//submit을 하면 밑에 리스트에 표시됨.
function handleTodoSubmit(e){
    e.preventDefault();
    const newTodo = inputToDo.value;
    inputToDo.value="";
    paintTodo(newTodo);
}

toDoForm.addEventListener('submit', handleTodoSubmit);