const form = document.querySelector(".js-form"),
    input = document.querySelector(".nameInput"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "savedUserName";
const PRINTING_CN = "printing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = input.value;
    printGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(PRINTING_CN);
    form.addEventListener("submit", handleSubmit);
}

function printGreeting(text) {
    form.classList.remove(PRINTING_CN);
    greeting.classList.add(PRINTING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const savedUserName = localStorage.getItem(USER_LS);

    if(savedUserName === null){
        // 사전 유저 입력 x
        askForName();
    } else {
        // 사전 유저 입력 o
        printGreeting(savedUserName);
    }
}

function init(){
    loadName();
}

init();