const todoTitleInput = document.getElementById("new-todo-title");
todoTitleInput.addEventListener("keyup", onAddTodoItem)

function onAddTodoItem(event) {
  const todoList = document.getElementById("todo-list");
  const title = event.target.value;

  if (event.key === "Enter" && title !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(title));
    event.target.value = "";
  }
}

function renderTodoItemTemplate(title) {
  const id = uniqueId();
  return `
  <li id="${id}">
    <div class="view">
      <input class="toggle" type="checkbox" id="${id}" />
      <label class="label">${title}</label>
      <button class="destroy" id="${id}"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>
`;
}

let uniqueId = (function () {
  let id = 0;
  return function() {
    return id++;
  }
})();