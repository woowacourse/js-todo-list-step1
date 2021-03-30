const $todoInput = document.querySelector("#new-todo-title");
const $todoToggle = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoToggle.addEventListener("click", toggleOrRemove);
$todoToggle.addEventListener("click", toggleOrRemove);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTotoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function renderTotoItemTemplate(title) {
    return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}

function toggleOrRemove(event) {
    if (event.target.className === "toggle") {
        return onToggleTodoItem(event);
    }

    return onRemoveTodoItem(event);
}

function onToggleTodoItem(event) {
    event.target.closest("li").classList.toggle("completed");
}

function onRemoveTodoItem(event) {
    if (confirm("정말로 삭제하시겠습니까?") === true) {
        event.target.closest("li").remove();
    }
}