const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(".todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleInput.addEventListener("click", onToggleTodoItem);


function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
  }
}

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
}

function renderTodoItemTemplate(title) {
  return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label" ondblclick="edit(event)">${title}</label>
                      <button class="destroy" onclick="deleteCheck(event)"></button>
                  </div>
              </li>`;
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "destroy") {
    item.parentElement.parentElement.remove();
  }
}
