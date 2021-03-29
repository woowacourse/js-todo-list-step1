const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $todoCount = document.querySelector("strong");
const $filters = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("dblclick", onEditTodoItem);
$filters.addEventListener("click", onFilter);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        updateTodoCount();
        event.target.value = "";
        changeState();
    }
}

function onToggleTodoItem(event) {
    if (event.target.classList.contains("toggle")) {
        event.target.closest("li").classList.toggle("completed");
        event.target.closest("input").toggleAttribute("checked");
        changeState()
    } else if (event.target.classList.contains("destroy")) {
        event.target.closest("li").remove();
        updateTodoCount();
        changeState();
    }
}

function onEditTodoItem(event) {
    if (event.target.classList.contains("label")) {
        const originalValue = event.target.innerText;
        event.target.closest("li").classList.add("editing");
        event.target.parentElement.parentElement.querySelector(".edit").focus();
        event.target.closest("li")
            .addEventListener("keyup", function (event) {editTodoItem(event, originalValue)});
    }
}

function editTodoItem(event, originalValue) {
    switch (event.key) {
        case "Enter" :
            return updateTodoItem(event)
        case "Escape" :
            event.target.value = originalValue;
            return event.target.closest("li").classList.remove("editing");
    }
}

function updateTodoItem(event) {
    const todos = document.querySelectorAll("#todo-list > li");
    const changeValue = event.target.value;
    todos.forEach((todo) => {
        if (todo.id === event.target.closest("li").id) {
            event.target.setAttribute("value", changeValue);
            todo.querySelector(".label").innerText = changeValue;
            todo.classList.remove("editing");
        }
    })
}

function renderTodoItemTemplate(title) {
    return ` <li id="${String(Date.now())}">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button id="${String(Date.now())}" class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}

function updateTodoCount() {
    const todos = $todoList.querySelectorAll("li");
    $todoCount.innerText = Array.from(todos).filter((todo) => !todo.classList.contains("hidden")).length.toString();
}

function onFilter(event) {
    if (event.target.nodeName === "A") {
        console.log(event.target);
        event.target.closest("ul").querySelectorAll("a")
            .forEach((a) => a.classList.remove("selected"));
        event.target.classList.add("selected");
        changeState();
    }
}

function getState() {
    const button = Array.from($filters.querySelectorAll("a"))
        .find((button) => button.classList.contains("selected"));
    if (button.classList.contains("active")) {
        return "active";
    }

    if (button.classList.contains("completed")) {
        return "completed";
    }
    return "all";
}

function changeState() {
    const state = getState();
    const todos = $todoList.querySelectorAll("li");
    todos.forEach((todo) => todo.classList.remove("hidden"));
    if (state === "active") {
        Array.from(todos).filter((todo) => todo.classList.contains("completed"))
            .forEach((activeTodo) => activeTodo.classList.add("hidden"));
    }
    if (state === "completed") {
        Array.from(todos).filter((todo) => !todo.classList.contains("completed"))
            .forEach((activeTodo) => activeTodo.classList.add("hidden"));
    }
    updateTodoCount();
}



