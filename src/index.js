const ENTER = "Enter";
const ESC = 27;
const EMPTY = "";
const ELEMENT = "li";

const $todoTitle = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

const $todoApp = document.querySelector(".todoapp");
const $showType = document.querySelector(".filters");

const $todoCount = document.querySelector(".todo-count");
const $allTodo = document.querySelector(".all");
const $activeTodo = document.querySelector(".active");
const $completedTodo = document.querySelector(".completed");


function addTodo(e) {
    if (e.key != ENTER || e.target.value == EMPTY) {
        return;
    }
    let inputTodoTitle = $todoTitle.value;
    let todoItem = document.createElement(ELEMENT);

    todoItem.classList.add("todo");
    todoItem.style.display = "block";
    todoItem.innerHTML = `
    <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${inputTodoTitle}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="${inputTodoTitle}" />
    `;
    $todoTitle.value = EMPTY;
    $todoList.append(todoItem);
}

function check(e) {
    if (e.target.className == "toggle") {
        e.target.closest(".todo").classList.toggle("completed");
    }

    if (e.target.hasAttribute("checked")) {
        e.target.removeAttribute("checked");
    }
    else {
        e.target.setAttribute("checked", '');
    }
}

function destroy(e) {
    if (e.target.className != "destroy") {
        return;
    }
    e.target.parentNode.parentNode.remove();
}

function edit(e) {
    if (e.target.className != "label") {
        return;
    }

    let editText = e.target;
    let onEditTodo = editText.closest(".todo");
    let prevText = editText.innerText;

    onEditTodo.classList.add("editing");

    onEditTodo.addEventListener("keyup", (e) => {
        if (e.key == ENTER) {
            editText.innerText = e.target.value
            onEditTodo.classList.remove("editing");
        }
        if (e.keyCode == ESC) {
            editText = prevText;
            onEditTodo.classList.remove("editing");
        }
    })
}

function count() {
    let todos = document.getElementsByClassName("todo");
    let count = 0;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].style.display == "block") {
            count++;
        }
    }

    $todoCount.innerText = `총 ${count} 개`;
}

function showAllTodo() {
    let todos = document.getElementsByClassName("todo");

    for (let i = 0; i < todos.length; i++) {
        todos[i].style.display = "block";
    }
}

function showActiveTodo() {
    let todos = document.getElementsByClassName("todo");

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].classList.contains("completed")) {
            todos[i].style.display = "none";
        }
        else {
            todos[i].style.display = "block";
        }
    }
}

function showCompleteTodo() {
    let todos = document.getElementsByClassName("todo");

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].classList.contains("completed")) {
            todos[i].style.display = "block";
        }
        else {
            todos[i].style.display = "none";
        }
    }
}

function changeSelected(e) {
    if ($allTodo.classList.contains("selected")) {
        $allTodo.classList.remove("selected");
    }
    if ($activeTodo.classList.contains("selected")) {
        $activeTodo.classList.remove("selected");
    }
    if ($completedTodo.classList.contains("selected")) {
        $completedTodo.classList.remove("selected");
    }

    e.target.classList.add("selected");
}

$todoTitle.addEventListener("keyup", addTodo);
document.addEventListener("click", check);
document.addEventListener("click", destroy);
document.addEventListener("dblclick", edit);
$allTodo.addEventListener("click", showAllTodo);
$activeTodo.addEventListener("click", showActiveTodo);
$completedTodo.addEventListener("click", showCompleteTodo);
$todoApp.addEventListener("click", count);
$todoApp.addEventListener("keyup", count);
$showType.addEventListener("click", changeSelected);