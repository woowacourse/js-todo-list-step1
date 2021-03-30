const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
let $todoCount = document.querySelector(".todo-count").querySelector("strong");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", toggleOrRemove);
$todoList.addEventListener("click", toggleOrRemove);
$todoList.addEventListener("dblclick", onEditTitle);
$todoList.addEventListener("keyup", onEnterEdit);
window.addEventListener("keyup", onEscapeEdit);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTotoItemTemplate(todoTitle));
        event.target.value = "";
    }

    onCountItems();
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
        todoItem.querySelector(".label").textContent = newTitle;
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

function onCountItems() {
    const itemCount = $todoList.querySelectorAll("li");
    $todoCount.textContent = itemCount == null ? 0 : itemCount.length;
}
