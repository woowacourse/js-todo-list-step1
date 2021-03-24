const $todoInput = document.querySelector("#new-todo-title");

$todoInput.addEventListener("keyup", onAddTodoItem);
document.getElementById("todo-list").addEventListener("click", onToggleTodoItem); // 바뀐 부분

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
return `
<li>
  <div class="view">
    <input class="toggle" type="checkbox">
    <label class="label">${title}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="새로운 타이틀">
</li>`;
}
