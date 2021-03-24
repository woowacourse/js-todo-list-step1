const $todoInput = document.querySelector("#new-todo-title");

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
  return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}

const $toggleInput = document.querySelector("#todo-list");

$toggleInput.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "INPUT") {
     onToggleTodoItem(e);
   }
});

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
  event.target.closest("input").toggleAttribute("checked");
}
