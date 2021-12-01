let counter = 0;
const num = document.querySelector('h1');
const btn = document.querySelector('#btn');

function handleClickBtn(){
    
    counter = counter+1;
    num.innerText = `count : ${counter}`;
}
btn.addEventListener('click', handleClickBtn);