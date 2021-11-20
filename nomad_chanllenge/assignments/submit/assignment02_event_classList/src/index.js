/* 내가 직접해서 제출 
function handleWindowResize() {
    const yellow = 'backgroundYellow';
    const blue = 'backgroundBlue';
    const purple = 'backgroundPurple';

    const windowWidth = window.innerWidth;
    const bodyClass = document.body.classList;

    if (windowWidth < 400) {
        bodyClass.add(yellow);
        bodyClass.remove(blue);
        bodyClass.remove(purple);
    } else if (windowWidth >= 400 && windowWidth < 800) {
        bodyClass.add(blue);
        bodyClass.remove(yellow);
        bodyClass.remove(purple);
    } else {
        bodyClass.add(purple);
        bodyClass.remove(yellow);
        bodyClass.remove(blue);
    }
}
window.addEventListener('resize', handleWindowResize);

 */


/* 다른사람 예시
function handleWindowResize2(){
    if(window.innerWidth < 400 ){
        document.body.style.backgroundColor = 'goldenrod';
    }else if(window.innerWidth < 700) {
        document.body.style.backgroundColor = 'lightseagreen';
    }else {
        document.body.style.backgroundColor = 'mediumpurple';
    }

}

window.addEventListener('resize', handleWindowResize2);
 */

//solution 본 후 다듬기
const smallSize = 'backgroundYellow';
const midSize = 'backgroundBlue';
const largeSize = 'backgroundPurple';



function handleWindowResize(){
    const width = window.innerWidth;
    const body = document.body;
    if(width < 400){
        body.classList.add(smallSize);
        body.classList.remove(midSize);
    }else if(width >=400 && window.innerWidth < 900){
        body.classList.add(midSize);
        body.classList.remove(smallSize, largeSize);
    }else{
        body.classList.add(largeSize);
        body.classList.remove(midSize);
    }
    console.log(body.className);

}
window.addEventListener('resize', handleWindowResize);