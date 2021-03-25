const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $filters = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoItem = document.createElement("li");
    if (event.key === "Enter" && todoTitle !== "") {
        todoItem.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        $todoList.appendChild(todoItem);
        event.target.value = "";
        updateTotalCount(); 

        addToggleEventOnInputBtn(todoItem);
        addRemoveEventOnDestroyBtn(todoItem);
        addEditEventOnLabel(todoItem);
    }
}

function addToggleEventOnInputBtn(todoItem) {
    const toggle = todoItem.querySelector(".view > input");
    toggle.addEventListener('click', function(event) {
        onToggleTodoItem(event);
    });
}

function onToggleTodoItem(event) {
    const input = event.target.closest("input");
    input.setAttribute("checked", "");
    event.target.closest("li").classList.toggle("completed");
}  

function addEditEventOnLabel(todoItem) {
    const label = todoItem.querySelector(".view > label");
    label.addEventListener('dblclick', function(event) {
        const li = todoItem.closest("li");
        li.classList.add("editing");
        onEditTodoItem(label, li);
    });
}

function onEditTodoItem(label, li) {
    const input = $todoList.querySelector(".edit");
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
            li.classList.remove("editing");
        }
        if (event.key === "Enter") {
            li.classList.remove("editing");
            label.innerHTML = input.value;
        }
    });
}


function addRemoveEventOnDestroyBtn(todoItem) {
    const removeBtn = todoItem.getElementsByClassName("destroy").item(0);
    removeBtn.addEventListener('click', function() {
        $todoList.removeChild(todoItem);
        updateTotalCount();
    });
}

function renderTodoItemTemplate(title) {
    return `<div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${title}>`;
}

function updateTotalCount() {
    const todoList = $todoList.getElementsByTagName("li");
    const todoCount = document.getElementsByClassName("todo-count").item(0);
    todoCount.innerHTML = "총 <strong>" + todoList.length + "</strong> 개";
}

// 모든 목록을 보여주는 함수
function showAllTodoItems() {
    todoItems = $todoList.children;
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].style.display;
    }
}

// 해야할 일만 보여주는 함수
function showTodoItems() {

}

// 완료된 일만 보여주는 함수
function showDoneTodoItems() {

}