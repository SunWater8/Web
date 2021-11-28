const body = document.querySelector('body');
const images = ["1.jpg", "2.jpg", "3.jpg"];

const chosenImage = images[Math.floor(Math.random()*images.length)];

body.style.backgroundImage = `url(images/${chosenImage})`;
body.style.backgroundSize = '100%';
body.style.backgroundRepeat = 'no-repeat';
//image.src = `images/${chosenImage}`;
//image.style.width = '100%';
//body.prepend(image);