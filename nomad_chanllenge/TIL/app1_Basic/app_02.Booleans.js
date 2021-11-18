/* Data Type - Boolean(true, false), null, undefined*/
console.log('<Boolean>');

// false and true
const amIFat = false;
console.log(amIFat);

// null은 '존재하지 않음', '아무것도 없음'이라는 값을 의미한다. false는 'false'라는 값을 가지고 있다는 점에서 null과 다르다.
const amIFine = null;
console.log(amIFine);

// undefined 은 정의되지 않음을 뜻함. 컴퓨터 메모리는 존재하지만 (공간은 차지하지만) 데이터는 가지고 있지 않은 상태이다.
let something;
console.log(something);

something = "one";
console.log(something);

/* null은 데이터를 가지고 있지만 undefined는 변수라는 껍데기만 있을 뿐 데이터(값)을 가지고 있지 않다는 차이점이 있다. */