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

const $changeInput = document.querySelector("#todo-list");

$changeInput.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "INPUT" && e.target.className === 'toggle') {
     onToggleTodoItem(e);
     return;
  }
  if (e.target && e.target.nodeName == "BUTTON") {
     onDestroyTodoItem(e);
     return
  }
});

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
  event.target.closest("input").toggleAttribute("checked");
}

function onDestroyTodoItem(event) {
  event.target.closest("li").parentNode.removeChild(event.target.closest("li"));
}


$changeInput.addEventListener("dblclick", function (e) {
  if (e.target && e.target.nodeName == "LABEL") {
     onDoubleClickTodoItem(e);
     return;
  }
});

function onDoubleClickTodoItem(event) {
  event.target.closest("li").getElementsByClassName("edit")[0].value = event.target.textContent;
  event.target.closest("li").getElementsByClassName("edit")[0].toggleAttribute("autoFocus");
  event.target.closest("li").classList.toggle("editing");
}

$changeInput.addEventListener("keyup", onEditTodoItem);

function onEditTodoItem(event) {
  const editTitle = event.target.closest("li").getElementsByClassName("edit")[0].value;
  if (event.target && event.target.nodeName == "INPUT" && event.target.className === 'edit' && event.key === "Enter" && editTitle !== "") {
    event.target.closest("li").getElementsByClassName("label")[0].textContent = editTitle;
    event.target.closest("li").classList.toggle("editing");
    return;
  }
  if (event.target && event.target.nodeName == "INPUT" && event.key === "Escape") {
    event.target.closest("li").classList.toggle("editing");
    return;
  }
}
