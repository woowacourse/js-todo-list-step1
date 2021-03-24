const TODO = document.getElementById("todo-list");
const TODO_INPUT = document.getElementById("new-todo-title");
const CONTENT_COUNT = document.getElementById("content-count");
const ALL_VIEW = document.getElementById("all");
const ACTIVE_VIEW = document.getElementById("active");
const COMPLETED_VIEW = document.getElementById("completed");
const ENTER = "Enter";
const ESC = "Escape";


// window.onload = () => {

// }


function addItem(event) {
    if (event.key === ENTER && TODO_INPUT.value.trim() !== "") {

        const dataObject = {
            value: TODO_INPUT.value.trim(), 
            listClassName: "false",
            isChecked: false,
        }

        createTempliate(dataObject)

        TODO_INPUT.value = "";
        countChange(getUrlType());
    }
}

function createTempliate(dataObject) {
    const newList = createList(dataObject.listClassName);
    const newDiv = createDiv();
    const newCheckbox = createCheckbox(dataObject.isChecked);
    const newLabel = createLabel(dataObject.value);
    const newButton = createButton();
    const hideInput = createHideInput(dataObject.value);
    
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
    newList.ondblclick = (event) => {
        const parentList = event.target.parentNode.parentNode
        parentList.className += " editing";
        parentList.children[1].display = "block";
    }
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
    newCheckbox.onclick = (event) => {
        const parentList = event.target.parentNode.parentNode;
        if (parentList.className === "false") {
            parentList.className = "completed";
        } else {
            parentList.className = "false";
        }
        countChange(getUrlType());
    }
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
    hideInput.onkeydown = (event) => {
        console.log(event.key);
        if (event.key === ESC) {
            event.target.display = "none";
            event.target.parentNode.className = event.target.parentNode.className.split(" ")[0];
            return;
        } 
        if (event.key === ENTER) {
            event.target.previousSibling.children[1].textContent = event.target.value;
            event.target.display = "none";
            event.target.parentNode.className = event.target.parentNode.className.split(" ")[0];
        }
    }
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
        countClass("completed")
    }
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
        countAll();
    } else if (event.target === ACTIVE_VIEW) {
        countClass("false");
    } else if (event.target === COMPLETED_VIEW) {
        countClass("completed");
    }
}

function getUrlType() {
    return window.location.href.split("/")[3];
}