const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", addTodoItem);
$toggleInput.addEventListener("click", toggleCompleteTodoItem);
$toggleInput.addEventListener("click", deleteTodoItem);
$toggleInput.addEventListener("doubleclick", editTodoItem);

function addTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
  }
}

function toggleCompleteTodoItem(event) {
  const todoItem = event.target.closest("li");
  const todoItemInput = todoItem.querySelector(".toggle");
  if (event.target.classList.contains("toggle")) {
    todoItem.classList.toggle("completed");
    todoItemInput.classList.toggle("checked");
  }
}

function deleteTodoItem(event) {
  const todoItem = event.target.closest("li");
  if (event.target.classList.contains("destroy")) {
    todoItem.remove();
  }
}

function editTodoItem(event) {
  const todoItem = event.target.closest("li");
  if (event.target.classList.contains("label")) {
    todoItem.remove();
  }
}

function renderTodoItemTemplate(title) {
  return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}
