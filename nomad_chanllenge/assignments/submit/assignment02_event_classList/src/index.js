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




/*
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