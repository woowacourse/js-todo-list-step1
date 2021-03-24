const TODO = document.getElementById("todo-list");
const TODO_INPUT = document.getElementById("new-todo-title");
const CONTENT_COUNT = document.getElementById("content-count");
const ALL_VIEW = document.getElementById("all");
const ACTIVE_VIEW = document.getElementById("active");
const COMPLETED_VIEW = document.getElementById("completed");
const ENTER = "Enter";
const ESC = "Escape";


window.onload = () => {
    TODO_INPUT.addEventListener("keydown", addItem);
    ALL_VIEW.addEventListener("click", changeSelect);
    ACTIVE_VIEW.addEventListener("click", changeSelect);
    COMPLETED_VIEW.addEventListener("click", changeSelect);
    loadLocalStorage();
}


function addItem(event) {
    if (event.key === ENTER && TODO_INPUT.value.trim() !== "") {

        const dataObject = {
            text: TODO_INPUT.value.trim(), 
            className: "false",
        }

        createTempliate(dataObject)

        TODO_INPUT.value = "";
        countChange(getUrlType());
    }
}

function createTempliate(dataObject) {
    const newList = createList(dataObject.className);
    const newDiv = createDiv();
    const newCheckbox = createCheckbox(dataObject.className === "completed");
    const newLabel = createLabel(dataObject.text);
    const newButton = createButton();
    const hideInput = createHideInput(dataObject.text);
    
    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newButton);
    newList.appendChild(newDiv);
    newList.appendChild(hideInput);
    TODO.appendChild(newList);
}

function createList(listClassName) {
    const newList = document.createElement("li");
    newList.className = listClassName;
    newList.addEventListener("dblclick", (event) => {
        const parentList = event.target.parentNode.parentNode
        parentList.className += " editing";
        parentList.children[1].display = "block";
    });
    return newList;
}

function createDiv() {
    const newDiv = document.createElement("div");
    newDiv.className = "view";
    return newDiv;
}

function createCheckbox(isChecked) {
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.className = "toggle";
    newCheckbox.checked = isChecked;
    newCheckbox.addEventListener("click", (event) => {
        const parentList = event.target.parentNode.parentNode;
        if (parentList.className === "false") {
            parentList.className = "completed";
        } else {
            parentList.className = "false";
        }
        countChange(getUrlType());
    });
    return newCheckbox;
}

function createLabel(inputData) {
    const newLabel = document.createElement("label");
    newLabel.textContent = inputData;
    newLabel.className = "label";
    return newLabel;
}

function createButton() {
    const newButton = document.createElement("button");
    newButton.className = "destroy";
    newButton.onclick = (event) => {
        const data = event.target.previousSibling.textContent;
        if (confirm(data + "을(를) 지우시겠습니까?") === false) {
            return;
        }
        const parentList = event.target.parentNode.parentNode;
        parentList.parentNode.removeChild(parentList);
        countChange(getUrlType());
    }
    return newButton;
}

function createHideInput(inputData) {
    const hideInput = document.createElement("input");
    hideInput.className = "edit";
    hideInput.value = inputData;
    hideInput.display = "none";
    hideInput.addEventListener("keydown", (event) => {
        if (event.key === ESC || event.key === ENTER) {
            if (event.key === ENTER) {
                event.target.previousSibling.children[1].textContent = event.target.value;
            }
            event.target.display = "none";
            event.target.parentNode.className = event.target.parentNode.className.split(" ")[0];
        } 
    });
    return hideInput;
}

function countChange(urlType) {
    if (urlType === "#") {
        countAll();
    }
    else if (urlType === "#active") {
        countClass("false");
    }
    else if (urlType === "#completed") {
        countClass("completed");
    }
    chagneDisplay(urlType);
    saveLocalStorage();
}

function countAll() {
    CONTENT_COUNT.textContent = TODO.children.length;
}

function countClass(className) {
    let count = 0;
    for (const todoItem of TODO.children) {
        if (todoItem.className === className) {
            count++;
        }
    }
    CONTENT_COUNT.textContent = count;
}

function changeSelect(event) {
    ALL_VIEW.className = "";
    ACTIVE_VIEW.className = "";
    COMPLETED_VIEW.className = "";

    event.target.className = "selected";
    if (event.target === ALL_VIEW) {
        countChange("#");
    } else if (event.target === ACTIVE_VIEW) {
        countChange("#active");
    } else if (event.target === COMPLETED_VIEW) {
        countChange("#completed");
    }
}

function chagneDisplay(urlType) {
    for (const item of TODO.children) {
        if (urlType === "#"
        || (urlType === "#active" && item.className === "false")
        || (urlType === "#completed" && item.className === "completed")) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
    
}

function getUrlType() {
    const urls = window.location.href.split("/");
    console.log(urls);
    if (urls[3] === "") {
        return "#";
    }
    return window.location.href.split("/")[3];
}

function loadLocalStorage() {
    if (localStorage.length === 0) {
        return;
    }
    const objects = JSON.parse(localStorage.getItem("todo"));
    for (const key in objects) {
        createTempliate(objects[key]);
    }
    countChange(getUrlType());
}

function saveLocalStorage() {
    const objects = {};
    const todoList = TODO.children;
    for (let i = 0; i < todoList.length; i++) {
        const item = todoList[i];
        objects[i] = {
            text: item.querySelector(".label").textContent,
            className: item.className
        };
    }
    localStorage.setItem("todo", JSON.stringify(objects));
}