const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const content = document.querySelector('#content');
const greeting = document.querySelector('#content h2');

const DISPLAY_HIDDEN = 'display_none';
const USERNAME_KEY = 'username';
const savedUsername = localStorage.getItem(USERNAME_KEY);

function submitUsername(username) {
    greeting.innerText = `🎈Hello! ${username}`;
    content.classList.remove(DISPLAY_HIDDEN);
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    if(username == ""){
        alert('You didn\'t write your name');
        return;
    }
    localStorage.setItem(USERNAME_KEY, username);
    console.log('username : ', username);

    loginForm.classList.add(DISPLAY_HIDDEN);
    submitUsername(username);
}

if (savedUsername == null) {
    //Show login form
    loginForm.classList.remove(DISPLAY_HIDDEN);
    console.log(loginForm.className);
    console.log(savedUsername);
    // 로그인 버튼 눌렀을 때 event
    loginForm.addEventListener('submit', handleLoginSubmit);
} else {
    // show username
    console.log(localStorage.getItem('username'));
    submitUsername(savedUsername);
}