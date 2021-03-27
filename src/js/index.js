const todoTitleInput = document.getElementById("new-todo-title");
todoTitleInput.addEventListener("keyup", onAddTodoItem)

function onAddTodoItem(event) {
  const todoList = document.getElementById("todo-list");
  const title = event.target.value;

  if (event.key === "Enter" && title !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(title));
  }
}

function renderTodoItemTemplate(title) {
  return `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>
`;
}
