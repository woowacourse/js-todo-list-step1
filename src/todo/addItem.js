import countItem from "./countItem.js";
import { STATES } from "./constants.js";

export default {
  onAddTodoItem: function ({ target, key }) {
    const todoTitle = target.value;
    const todoList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.classList.add(STATES.ACTIVE);
    li.innerHTML = renderTodoItemTemplate(todoTitle);
    if (key === "Enter" && todoTitle !== "") {
      todoList.appendChild(li);
      target.value = "";
    }
    countItem.onCountItem();
  },
};

function renderTodoItemTemplate(title) {
  return `
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">`;
}
