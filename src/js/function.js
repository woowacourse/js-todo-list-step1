const ENTER = "Enter";
const ESC = "Escape";
const CLASS_NAME_FALSE = "false";
const CLASS_NAME_COMPLETED = "completed";
const URL_NAME_COMPLETED = "#completed"
const URL_NAME_ACTIVE = "#active"
const URL_NAME_ALL = "#";

const TODO = document.getElementById("todo-list");
const TODO_INPUT = document.getElementById("new-todo-title");
const CONTENT_COUNT = document.getElementById("content-count");
const ALL_VIEW = document.getElementById("all");
const ACTIVE_VIEW = document.getElementById("active");
const COMPLETED_VIEW = document.getElementById(CLASS_NAME_COMPLETED);


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
            className: CLASS_NAME_FALSE,
        }

        createTemplate(dataObject)

        TODO_INPUT.value = "";
        countChange(getUrlType());
    }
}

function createTemplate(dataObject) {
    const newList = createList(dataObject.className);
    const newDiv = createDiv();
    const newCheckbox = createCheckbox(dataObject.className === CLASS_NAME_COMPLETED);
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
        event.target.toggleAttribute("checked");
        if (event.target.checked === true) {
            parentList.className = CLASS_NAME_COMPLETED;
        } else {
            parentList.className = CLASS_NAME_FALSE;
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
            } else {
                event.target.value = event.target.previousSibling.children[1].textContent;
            }
            event.target.display = "none";
            event.target.parentNode.className = event.target.parentNode.className.split(" ")[0];
        } 
    });
    return hideInput;
}

function countChange(urlType) {
    if (urlType === URL_NAME_ALL) {
        countAll();
    }
    else if (urlType === URL_NAME_ACTIVE) {
        countClass(CLASS_NAME_FALSE);
    }
    else if (urlType === URL_NAME_COMPLETED) {
        countClass(CLASS_NAME_COMPLETED);
    }
    changeDisplay(urlType);
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
        countChange(URL_NAME_ALL);
    } else if (event.target === ACTIVE_VIEW) {
        countChange(URL_NAME_ACTIVE);
    } else if (event.target === COMPLETED_VIEW) {
        countChange(URL_NAME_COMPLETED);
    }
}

function changeDisplay(urlType) {
    for (const item of TODO.children) {
        if (urlType === URL_NAME_ALL
        || (urlType === URL_NAME_ACTIVE && item.className === CLASS_NAME_FALSE)
        || (urlType === URL_NAME_COMPLETED && item.className === CLASS_NAME_COMPLETED)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
    
}

function getUrlType() {
    const urls = window.location.href.split("/");
    if (urls[3] === "") {
        return URL_NAME_ALL;
    }
    return window.location.href.split("/")[3];
}

function loadLocalStorage() {
    if (localStorage.length === 0) {
        return;
    }
    const objects = JSON.parse(localStorage.getItem("todo"));
    for (const key in objects) {
        createTemplate(objects[key]);
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