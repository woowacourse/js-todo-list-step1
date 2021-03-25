const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener('click', onRemoveTodoItem);

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
                  <label class="label">${title}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="새로운 타이틀">
          </li>`;
}

function onRemoveTodoItem(event) {
  const target = event.target;
  if (target && target.className == "destroy") {
    const li = target.parentNode.parentNode;
    li.parentNode.removeChild(li);
  }
}
