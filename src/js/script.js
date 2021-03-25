const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $filters = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
// $todoList.addEventListener("click", onToggleTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    const todoItem = document.createElement("li");
    if (event.key === "Enter" && todoTitle !== "") {
        todoItem.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        todoList.appendChild(todoItem);
        event.target.value = "";
        updateTotalCount(); 

        addToggleEventOnInputBtn();
        addRemoveEventOnDestroyBtn(todoItem);
        addEditEventOnLabel(todoItem);
    }
}

function addToggleEventOnInputBtn() {
    const toggle = document.querySelector(".toggle");
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
    // label을 더블 클릭 할 때 이벤트 발생하도록 하기
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
        if (event.keyCode == 27) { // esc
            li.classList.remove("editing");
        }
        if (event.keyCode == 13) { // enter
            li.classList.remove("editing");
            label.innerHTML = input.value;
        }
    });
}


function addRemoveEventOnDestroyBtn(todoItem) {
    const removeBtn = todoItem.getElementsByClassName("destroy").item(0);
    removeBtn.addEventListener('click', function() {
        const todoList = document.getElementById("todo-list");
        todoList.removeChild(todoItem);
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
    const todoList = document.getElementById("todo-list").getElementsByTagName("li");
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