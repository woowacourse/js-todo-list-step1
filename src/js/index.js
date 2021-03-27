const $todoInput = document.getElementById("new-todo-title");
$todoInput.addEventListener('keyup', addTodoItem);

const $todoList = document.getElementById("todo-list");
$todoList.addEventListener('click', completeOrDelete)
$todoList.addEventListener('dblclick', editTodoItem)
$todoList.addEventListener('keyup', cancelEditItem)

const $allSelected = document.querySelector(".selected");
const $active = document.querySelector(".active");
const $completed = document.querySelector(".completed");

function showAll(event) {
    $active.classList.remove("selected")
    $completed.classList.remove("selected")

    event.target.classList.toggle("selected")
    Array.from($todoList.children).forEach(element => element.style.display = "block")
    updateTodoItemCount($todoList.childElementCount);
}

function showTodo(event) {
    $allSelected.classList.remove("selected")
    $completed.classList.remove("selected")

    event.target.classList.toggle("selected")
    const completed = Array.from($todoList.children).filter(element => element.classList.contains("completed"));
    const notCompleted = Array.from($todoList.children).filter(element => !element.classList.contains("completed"));

    notCompleted.forEach(element => element.style.display = 'block')
    completed.forEach(element => element.style.display = 'none')
    updateTodoItemCount(notCompleted.length)
}

function showCompleted(event) {
    $allSelected.classList.remove("selected")
    $active.classList.remove("selected")

    event.target.classList.toggle("selected")
    const completed = Array.from($todoList.children).filter(element => element.classList.contains("completed"));
    const notCompleted = Array.from($todoList.children).filter(element => !element.classList.contains("completed"));

    completed.forEach(element => element.style.display = 'block')
    notCompleted.forEach(element => element.style.display = 'none')
    updateTodoItemCount(completed.length)
}

$allSelected.addEventListener('click', showAll)
$active.addEventListener('click', showTodo)
$completed.addEventListener('click', showCompleted)

const $count = document.querySelector("strong")

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($todoInput.value);
        $todoList.insertAdjacentHTML("beforeend", addedItem);
        $todoInput.value = null;
    }
    updateTodoItemCount($todoList.childElementCount);
}

function getTodoItem(itemTitle) {
    return ` <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${itemTitle}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`
}

function completeOrDelete(event) {
    const todoItem = event.target.closest("li")
    if (event.target.type === 'checkbox' && !event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.add("checked")
        return;
    }

    if (event.target.type === 'checkbox' && event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.remove("checked")
        return;
    }

    if (event.target.tagName === 'BUTTON') {
        todoItem.remove();
        updateTodoItemCount();
    }
}

function updateTodoItemCount(count) {
    $count.innerText = count;
}

function editTodoItem(event) {
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

