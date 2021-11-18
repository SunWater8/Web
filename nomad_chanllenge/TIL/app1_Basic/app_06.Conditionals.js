console.log("<Conditionals>");

/*2.13 Conditionals */

// prompt라고 하는 함수로 값을 받은 후 (반환값은 항상 String) 숫자로 형 변환 하기.
const age = prompt("How old are you?");
console.log(age, parseInt(age)); // prompt의 답을 사용자가 문자로 했다면 console에는 NaN라고 찍힘.

// isNaN으로 prompt 반환 값이 숫자인지 아닌지 확인하기 - isNaN은 Boolean을 반환
console.log(isNaN(age)); // false로 나오면 숫자인 것이고 , true이면 문자임.

// if ~ else 를 이용해서 prompt로 받은 값이 숫자면 그대로 다음을 진행할 수 있게 하고, 문자로 값을 받게 되면 다시 입력하라는 메시지를 console에 출력하기.
if(isNaN(age)){
    // if the age is not a number
    console.log("write a number");
}else {
    //is the age is a number
    console.log("Thank you for your writing your age");
}

/* 2.13 Conditionals 2 */

// if ~ else if 이용
