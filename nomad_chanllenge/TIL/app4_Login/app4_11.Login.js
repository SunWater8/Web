/* 4.0 Input Values */
console.log('<4.0 Input Values');

// 어떤 id안의 input 과 button 태그를 캐스팅하는 방법 1.
const loginForm = document.querySelector('#login-form');
const inputBox = loginForm.querySelector('input');
const loginButton = loginForm.querySelector('button');
console.log('login form', loginForm);
console.log(inputBox);
console.log(loginButton);

// 어떤 id안의 input 과 button 태그를 캐스팅하는 방법 2. - 원래 해왔던 방식. document로 캐스팅 
const loginInput = document.querySelector('#login-form input');
const loginBtn = document.querySelector('#login-form button');
console.log('Input', loginInput);
console.log('button', loginBtn);

// login 버튼 클릭하면 로그인 정보 콘솔에 보이게 하기.
function handleClickBtn() {
    console.dir(loginInput);
    console.log('hello', loginInput.value);
}

loginBtn.addEventListener('click', handleClickBtn);

/* 4.1  Form Submission*/
const loginForm2 = document.querySelector('#login-form2');
const loginInput2 = document.querySelector('#login-form2 input');
const loginBtn2 = document.querySelector('#login-form2 button');

//공백을 허용하지 않고, 15자 이하로 입력하여야 버튼 클릭이 실행되도록 하기.
function handleClickBtn2() {

    /* 

    if(loginInput2 == ""){
        alert('Write your name!');
    }else if(loginInput2.length > 15){
        alert('Your name is too long');
    }else{
        console.log('hello2', loginInput2.value);
    } 
    
    */

    //주석 이유 : 이미 html에서 input 안에 required와 maxlength 설정을 하였기 때문. 
}
loginBtn2.addEventListener('click', handleClickBtn2);




/* 4.2 Events */
console.log('<4.2 Events>');

// preventDefault()함수를 이용해서 로그인 버튼을 눌렀을 때 ( form 이 submit 되었을 때) 새로고침 되는 기본 설정을 새로고침 되지 않게 하도록 바꿔보기
console.log('login form', loginForm2);
function onLoginSubmit(event) {
    event.preventDefault();
    console.log('user name : ', loginInput2.value);
    console.log(event);
}

loginForm2.addEventListener('submit', onLoginSubmit);

/* 4.3 Events 2 */
//anchor의 event

const link = document.querySelector('a');
console.log(link);

function handleLinkClick(event) { //매개변수로 뭔가가 들어가게 되면 이벤트가 일어날 때 들어오는 정보를 담는 역할을 한다.
    event.preventDefault(); // 링크에 건 click 이벤트의 기본값은 다른 페이지가 열리도록 하는 것인데 preventDefault로 그 행동을 막을 수 있다.
    console.log('event', event); // PointerEvent 의 속성(클릭 위치)이 나열됨. 속성: isTrusted, pointerId, width, height, pressure 등등
}
link.addEventListener('click', handleLinkClick);

/* 4.4 Getting Username */
console.log('<4.4 Getting Username>');

const loginForm3 = document.querySelector('#login-form3');
console.log(loginForm3);
const loginInput3 = document.querySelector('#login-form3 input');
const greeting = document.querySelector('#login-form3+h1');

const HIDDEN_CLASSNAME = 'display-none'; //String으로만 되어 있는 변수는 대문자로 만들어주는 것이 관습!

function handleLoginSubmit(event) {
    const username = loginInput3.value;
    event.preventDefault(); //꼭 이걸 써주어야 다음화면으로 넘어가지 않는다.
    console.log(username);
    
    //폼을 지우고 hello  화면 전환하기.
    loginForm3.classList.add(HIDDEN_CLASSNAME);
    greeting.innerText = `hello ${username}`; 
    // `hello ${username}' 은 "hello "+ username 이라고 쓰는 것과 동일한 의미를 갖느다. 
    // single/double quote를 쓰지 않고 ` 를 사용하면 ${given data name}를 쓸 수 있다.
    
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
loginForm3.addEventListener('submit', handleLoginSubmit);



