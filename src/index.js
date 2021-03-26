const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function renderTodoItemTemplate(title) {
    return ` <li class="todo-item">
                  <div class="view">
                      <input class="toggle" onclick="onToggleTodoItem(event)" type="checkbox" >
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value=${title} />
              </li>`;
}

function onToggleTodoItem(event) {
    const target = event.target;
    if (target.className === 'toggle') {
        target.closest("li").classList.toggle("completed");
    }
}