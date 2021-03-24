export default {
  onAddTodoItem: function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    let li = document.createElement('li');
    li.innerHTML = renderTodoItemTemplate(todoTitle);
    if (event.key === "Enter" && todoTitle !== "") {
      todoList.appendChild(li);
      event.target.value = "";
    }
  }
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
