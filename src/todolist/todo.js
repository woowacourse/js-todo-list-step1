const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $todoCount = document.querySelector(".todo-count").querySelector("strong");
const $filters = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", toggleOrRemove);
$todoList.addEventListener("click", toggleOrRemove);
$todoList.addEventListener("dblclick", onEditTitle);
$todoList.addEventListener("keyup", onEnterEdit);
window.addEventListener("keyup", onEscapeEdit);
$filters.addEventListener("click", onFilter);

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
                  <input class="edit" onfocus=select() value="새로운 타이틀" autofocus>
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
}

function onToggleTodoItem(event) {
    event.target.closest("li").classList.toggle("completed");
}

function onRemoveTodoItem(event) {
    if (confirm("정말로 삭제하시겠습니까?") === true) {
        event.target.closest("li").remove();
    }

    onCountItems();
}

function onEditTitle(event) {
    const todoItem = event.target.closest("li");
    todoItem.classList.add("editing");
    todoItem.querySelector(".edit").focus();
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
    const $classListOfFilters = $filters.querySelector("a.selected").classList;

    if ($classListOfFilters.contains("active")) {
        onCountActiveItems();
    } else if ($classListOfFilters.contains("completed")) {
        onCountCompletedItems();
    } else {
        onCountAllItems();
    }
}

function onCountAllItems() {
    onCount("li");
}

function onCountActiveItems() {
    onCount("li:not(li.completed)");
}

function onCountCompletedItems() {
    onCount("li.completed");
}

function onCount(selector) {
    const items = $todoList.querySelectorAll(selector);
    $todoCount.textContent = items == null ? 0 : items.length;
}

function onFilter(event) {
    $filters.querySelector("a.selected").classList.remove("selected");
    const classListOfEventFilter = event.target.closest("a").classList;
    classListOfEventFilter.add("selected");
    showFilteredItems(classListOfEventFilter);
}

function showFilteredItems(classListOfEventFilter) {
    if (classListOfEventFilter.contains("active")) {
        filterTodo();
    } else if (classListOfEventFilter.contains("completed")) {
        filterCompleted();
    } else {
        showAll();
    }
}

function filterTodo() {
    removeHidden();

    Array.from($todoList.querySelectorAll("li"))
        .filter(items => items.classList.contains("completed"))
        .forEach(todos => todos.classList.add("hidden"));

    onCountActiveItems();
}

function filterCompleted() {
    removeHidden();

    Array.from($todoList.querySelectorAll("li"))
        .filter(items => !items.classList.contains("completed"))
        .forEach(todos => todos.classList.add("hidden"));

    onCountCompletedItems();
}

function showAll() {
    removeHidden();
    onCountAllItems();
}

function removeHidden() {
    $todoList.querySelectorAll("li").forEach(items => items.classList.remove("hidden"));
}
