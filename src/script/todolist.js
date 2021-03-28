const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");
const $count = document.querySelector("strong")
$todoInput.addEventListener('keyup', addTodoItem);
$todoList.addEventListener('keyup', cancelEditItem);
$todoList.addEventListener('click', todoComplete);
$todoList.addEventListener('click', todoDelete);
$todoList.addEventListener('dblclick', todoEdit);

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($todoInput);
        $todoList.insertAdjacentHTML("beforeend", addedItem);
        $todoInput.value = null;  // input clear
    }
    updateTodoItemsCount($todoList.childElementCount);
}

function todoComplete(event) {
    const todoItem = event.target.closest("li")

    if (event.target.type === 'checkbox' &&
        !event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.add("checked")
    } else if (event.target.type === 'checkbox' &&
        event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.remove("checked")
    }
}

function updateTodoItemsCount(count) {
    $count.innerText = count;
}

function todoDelete(event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.closest("li").remove();
    }
    updateTodoItemsCount($todoList.childElementCount);
}

function todoEdit(event) {
    const todoItem = event.target.closest("li");
    todoItem.classList.add("editing");
    todoItem.querySelector(".edit").addEventListener('keyup', completeEdit)
}

function completeEdit(event) {
    const todoItem = event.target.closest("li");
    if (event.key === 'Enter') {
        todoItem.querySelector(".label").textContent = event.target.value;
        todoItem.classList.remove("editing");
    }
}

function cancelEditItem(event) {
    if (event.target.className === 'edit' && event.key === 'Escape') {
        event.target.closest("li").classList.remove("editing");
    }
}

function getTodoItem(itemTitle) {
    return ` <li>
     <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${itemTitle.value}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${itemTitle.value}" />
      
  </li>`
}

const $allSelected = document.querySelector(".selected");
const $active = document.querySelector(".active");
const $completed = document.querySelector(".completed");

$allSelected.addEventListener('click', showAll)
$active.addEventListener('click', showTodo)
$completed.addEventListener('click', showCompleted)

function showAll() {
    Array.from($todoList.children).forEach(
        element => element.style.display = "block")
    updateTodoItemsCount($todoList.childElementCount);
}

function showTodo() {
    const completed = Array.from($todoList.children).filter(
        element => element.classList.contains("completed"));
    const notCompleted = Array.from($todoList.children).filter(
        element => !element.classList.contains("completed"));

    notCompleted.forEach(element => element.style.display = 'block')
    completed.forEach(element => element.style.display = 'none')
    updateTodoItemsCount(notCompleted.length)
}

function showCompleted() {
    const completed = Array.from($todoList.children).filter(
        element => element.classList.contains("completed"));
    const notCompleted = Array.from($todoList.children).filter(
        element => !element.classList.contains("completed"));

    completed.forEach(element => element.style.display = 'block')
    notCompleted.forEach(element => element.style.display = 'none')
    updateTodoItemsCount(completed.length)
}
