/* 7.0 Setup */

const toDoForm = document.querySelector('#toDoForm');
const inputToDo = toDoForm.querySelector('input');
const toDoList = document.querySelector('#toDoForm+ul');

//submit을 하면 밑에 리스트에 표시됨.

function handleTodoSubmit(e){
    e.preventDefault();
    const newTodo = inputToDo.value;
    console.log(inputToDo.value);
    inputToDo.value="";

    painTodo(newTodo);
}

toDoForm.addEventListener('submit', handleTodoSubmit);

/* 7.1 Adding ToDos */

function painTodo(newTodo){
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
    console.log(e); // path 확인하여 list마다 각기 다른 property를 갖고 있음을 알 수 있다.
    console.log(e.target);
    console.dir(e.target);
    
    // button의 parent
    console.log('parentNode', e.target.parentNode); //<li>...</li>
    console.log('parentElement', e.target.parentElement); //<li>...</li>
    console.log('innerHTML', e.target.parentElement.innerHTML);
    console.log('innerText', e.target.parentElement.innerText);

    //삭제할 li
    const li = e.target.parentElement;
    li.remove();

}

