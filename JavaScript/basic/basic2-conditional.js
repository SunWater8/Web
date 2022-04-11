//operator

let addr = 'incheon';
let result = (addr == 'incheon' ? 'yes' : 'no');
console.log(`result: ${result}`);

switch (addr) {
    case 'seoul':
        console.log('the location is seoul');
    case 'daejeon':
        console.log('the location is daejeon');
    case 'incheonk':
        console.log('the location is incheon');
    default:
        console.log('you should check your address');

}

//iterate from 0 to 10 ,
//and print only even numbers (use continue)
for(let num = 0; num <= 10; num++){
    if(num % 2 == 0){
        continue;
    }
    console.log(`${num}`);
}

//iterate from 0 to 10,
//and print numbers until reaching 8 (use break)
for(let i = 0; i <= 10 ; i++){
    if (i > 8) {
        break;
    }
    console.log(i);
}