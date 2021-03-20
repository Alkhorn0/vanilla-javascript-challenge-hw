const body = document.querySelector("body");

const IMG_NUMBER = 5;

function printImage(randomNumber) {
    const image = new Image();
    image.src = `images/${randomNumber}.png`;
    image.classList.add("backgroundImage");
    body.appendChild(image);
}

function makeRandomNumber(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = makeRandomNumber();
    printImage(randomNumber);
}

init();