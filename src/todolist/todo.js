const $todoInput = document.querySelector("#new-todo-title");
const $todoToggle = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoToggle.addEventListener("click", toggleOrRemove);
$todoToggle.addEventListener("click", toggleOrRemove);
$todoToggle.addEventListener("dblclick", onEditTitle);
$todoToggle.addEventListener("keyup", onEnterEdit);
window.addEventListener("keyup", onEscapeEdit);

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
                      <label class="label" id="item-title">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" onfocus=select() value="새로운 타이틀">
              </li>`;
}

function toggleOrRemove(event) {
    const eventName = event.target.className;
    if (eventName === "toggle") {
        return onToggleTodoItem(event);
    }

    if (eventName === "destroy") {
        return onRemoveTodoItem(event);
    }

    return null;
}

function onToggleTodoItem(event) {
    event.target.closest("li").classList.toggle("completed");
}

function onRemoveTodoItem(event) {
    if (confirm("정말로 삭제하시겠습니까?") === true) {
        event.target.closest("li").remove();
    }
}

function onEditTitle(event) {
    const todoItem = event.target.closest("li");
    todoItem.classList.add("editing");
    todoItem.querySelector(".edit");
}

function onEnterEdit(event) {
    const todoItem = event.target.closest("li");
    const newTitle = event.target.value;

    if (event.key === "Enter" && newTitle !== "") {
        todoItem.querySelector(".label").innerHTML = newTitle;
        todoItem.classList.remove("editing");
    }
}

function onEscapeEdit(event) {
    const checkEscapePressed = event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;
    const checkAnyEditing = document.querySelector(".editing") != null;

    if (checkAnyEditing && checkEscapePressed) {
        document.querySelector(".editing").classList.remove("editing");
    }
}
