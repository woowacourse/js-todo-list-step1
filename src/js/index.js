const $todoInput = document.querySelector("#new-todo-title");
const $toggleParentList = document.querySelector(".todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleParentList.addEventListener("keyup", onEditTodoItem)
$toggleParentList.addEventListener("click", onToggleTodoItem);
$toggleParentList.addEventListener("click", onRemoveTodoItem);
$toggleParentList.addEventListener("dblclick", onEditModeTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function onRemoveTodoItem(event) {
    if (event.target && event.target.className === "destroy") {
        const todoList = document.getElementById("todo-list");
        todoList.removeChild(event.target.closest(".todo-item"));
    }
}

function onEditModeTodoItem(event) {
    event.target.closest(".todo-item").classList.add("editing");
}

function onEditTodoItem(event) {
    if (event.target && event.target.className === "edit") {
        const todoItem = event.target.closest(".todo-item");
        const todoTitle = event.target.value;

        if (event.key === "Enter" && todoTitle !== "") {
            event.target.value = todoTitle;
            todoItem.querySelector(".label").textContent = todoTitle;
            todoItem.classList.remove("editing");
        } else if (event.key === "Escape") {
            event.target.value = todoItem.querySelector(".label").textContent;
            todoItem.classList.remove("editing");
        }
    }
}

function onToggleTodoItem(event) {
    if (event.target && event.target.className === "toggle") {
        event.target.closest("li").classList.toggle("completed");
    }
}

function renderTodoItemTemplate(title) {
    return ` <li class="todo-item">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}