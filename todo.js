const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".pendingList"),
    finishedList = document.querySelector(".finishedList");
    
const PENDING_LS = "PENDING",
    FINISHED_LS = "FINISHED";


let pendingToDos = [],
    finishedToDos = [];

    
function deletePendingToDo(e) {
        const btn = e.target;
        const li = btn.parentNode;
        pendingList.removeChild(li);
        const renewToDos = pendingToDos.filter(function (toDo) {
            return toDo.id !== parseInt(li.id);
        });
        pendingToDos = renewToDos;
        savePending();
}
    
function deleteFinishedToDo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const renewToDos = finishedToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finishedToDos = renewToDos;
    saveFinished();
}

function switchToDo(e) {
    const btn = e.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const switchToDos = pendingToDos.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    const renewToDos = pendingToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    const currentValue = switchToDos[0].text;
    const currentId = switchToDos[0].id;
    printFinishedToDo(currentValue,currentId);
    pendingToDos = renewToDos;
    savePending();
        
}
    
function notFinished(e) {
    const btn = e.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const switchToDos = finishedToDos.filter(function (toDo){
        return toDo.id === parseInt(li.id);
    });
    const renewToDos = finishedToDos.filter(function (toDo){
        return toDo.id !==  parseInt(li.id);
    });
    const currentValue = switchToDos[0].text;
    const currentId = switchToDos[0].id;
    printPendingToDo(currentValue, currentId);
    finishedToDos = renewToDos;
    saveFinished();
}

function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingToDos));
}

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}

function printPendingToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = pendingToDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "X";
    doneBtn.innerText = "★";
    delBtn.addEventListener("click", deletePendingToDo);
    doneBtn.addEventListener("click", switchToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    pendingToDos.push(toDoObj);
    savePending();
}

function printFinishedToDo(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    delBtn.innerText = "X";
    backBtn.innerText = "←"
    delBtn.addEventListener("click", deleteFinishedToDo);
    backBtn.addEventListener("click", notFinished);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = id;
    finishedList.appendChild(li);
    const toDoObj = {
        text: text,
        id: id
    }
    finishedToDos.push(toDoObj);
    saveFinished();
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = toDoInput.value;
    printPendingToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedPendingToDos = localStorage.getItem(PENDING_LS);
    const loadedFinishedToDos = localStorage.getItem(FINISHED_LS);
    if(loadedPendingToDos !== null) { 
        const parsedToDos = JSON.parse(loadedPendingToDos);
        parsedToDos.forEach(function(toDo) {
            printPendingToDo(toDo.text)
        });
    }
    if(loadedFinishedToDos !== null) { 
        const parsedToDos = JSON.parse(loadedFinishedToDos);
        parsedToDos.forEach(function(toDo) {
            printFinishedToDo(toDo.text, toDo.id)
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();