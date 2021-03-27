const $todoInput = document.querySelector("#new-todo-title");
const $toggleParentList = document.querySelector(".todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleParentList.addEventListener("click", onToggleTodoItem);
$toggleParentList.addEventListener("click", onRemoveTotoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function onRemoveTotoItem(event) {
    if (event.target && event.target.className === "destroy") {
        const todoList = document.getElementById("todo-list");
        todoList.removeChild(event.target.closest(".todo-item"));
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
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}