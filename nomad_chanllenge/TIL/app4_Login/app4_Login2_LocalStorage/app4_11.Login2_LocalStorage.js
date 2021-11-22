/* 4.5  Saving Username*/
// localStroage 사용하여 data를 저장, 읽기, 삭제 해보기
// 저장 : localStorage.setItem("username". "silver")
// 읽기 : localStorage.getItem("username")
// 삭제 : localStorage.remove("username")


/* 4.6  Loading Username*/
// localStorage에 데이터가 있으면 데이터 먼저 보여주고, 없으면 form 보여주기

const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#login-form+h2');

const DISPLAY_HIDDEN = 'display_none';
const USERNAME_KEY = 'username';
const savedUsername = localStorage.getItem(USERNAME_KEY);



function submitUsername(username) {
    greeting.innerText = `Hello! ${username}`;
    greeting.classList.remove(DISPLAY_HIDDEN);
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    console.log('username : ', username);

    loginForm.classList.add(DISPLAY_HIDDEN);
    submitUsername(username);
}

if (savedUsername == null) {
    //Show login form
    loginForm.classList.remove('display_none');
    console.log(loginForm.className);
    console.log(savedUsername);
    // 로그인 버튼 눌렀을 때 event
    loginForm.addEventListener('submit', handleLoginSubmit);
} else {
    // show username
    console.log(localStorage.getItem('username'));
    submitUsername(savedUsername);
}