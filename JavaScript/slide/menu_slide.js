// // 캐스팅하기
// const menu1 = document.querySelector('[alt="상위메뉴이미지1"]');
// const menu2 = document.querySelector('[alt="상위메뉴이미지2"]');
// console.log(menu1);
// console.log(menu2);

// const innerUl = document.querySelector('.menu a+ul');
// console.log(innerUl);

// function handelMenu1Click(){
//     innerUl.removeClass();
// }

// menu1.addEventListener('click',handelMenu1Click);
// // menu1.onclick = handelMenu1Click;
const aMenu = document.querySelector('.menu>a');
aMenu.onclick = function () {
    const submenu = this.next('ul');
    if (submenu.is(':visible')) {
        submenu.slideUp();
    } else {
        submenu.slideDown();
    }
};

aMenu.addEventListener('click', aMenu)