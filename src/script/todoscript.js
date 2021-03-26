const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $filter = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", evt => {
    onToggleTodoItem(evt);
    onDestroyTodoItem(evt);
});
$todoList.addEventListener("dblclick", onEditTodoItem);
$filter.addEventListener("click", filterTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        updateTodoCount(".view");
    }
}

function updateTodoCount(classname) {
    const count = $todoList.querySelectorAll(classname).length;
    const todoCount = document.querySelector(".todo-count").querySelector("strong");
    todoCount.textContent = count.toString();
}

function onToggleTodoItem(event) {
    const item = event.target.closest("li");
    if (event.target.className === "toggle") {
        item.className === "completed" ? item.className = "ongoing" : item.className = "completed";
    }
}

function onDestroyTodoItem(event) {
    if (event.target.className === "destroy") {
        event.target.closest("li").remove();
        updateTodoCount(".view");
    }
}

function filterTodoItem(event) {
    const classes = $todoList.querySelectorAll("li");
    const buttonName = event.target.className;
    if (buttonName === "completed") {
        displayCompleted(classes);
        updateTodoCount(".completed");
        return;
    }
    if (buttonName === "active") {
        displayView(classes);
        updateTodoCount(".ongoing");
        return;
    }
    displayAll(classes);
}

function displayCompleted(classes) {
    classes.forEach(
        function (value) {
            if (!value.classList.contains("completed")) {
                value.style.display = "none";
                return;
            }
            value.style.display = "block";
        })
}

function displayView(classes) {
    classes.forEach(
        function (value) {
            if (value.classList.contains("completed")) {
                value.style.display = "none";
                return;
            }
            value.style.display = "block";
        })
}

function displayAll(classes) {
    classes.forEach(
        function (value) {
            value.style.display = "block";
        })
    updateTodoCount(".view");
}

function onEditTodoItem(event) {
    const editTarget = event.target.closest("li");
    editTarget.classList.add("editing");
    let editInput = editTarget.querySelector(".edit");

    editInput.addEventListener("keyup", function (e) {
        if (e.keyCode === 27) {
            editTarget.classList.remove("editing");
        }
        if (e.key === "Enter") {
            editTarget.classList.remove("editing");
            event.target.textContent = e.target.value;
        }
    })
}

function renderTodoItemTemplate(title) {
    return ` <li class="ongoing">
                  <div class="view">
                      <input class="toggle" type="checkbox"/>
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}
