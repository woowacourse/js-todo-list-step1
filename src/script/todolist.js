const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

$todoInput.addEventListener('keyup', addTodoItem);

$todoList.addEventListener('click', todoComplete)

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($todoInput);
        $todoList.insertAdjacentHTML("beforeend", addedItem);
        $todoInput.value = null;  // input clear
    }
}

function todoComplete(event) {
    const todoItem = event.target.closest("li")

    if (event.target.type === 'checkbox' &&
        !event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.add("checked")
        return;
    }

    if (event.target.type === 'checkbox' &&
        event.target.classList.contains("checked")) {
        todoItem.classList.toggle("completed");
        todoItem.querySelector(".toggle").classList.remove("checked")
        return;
    }
}

function getTodoItem(itemTitle) {
    return ` <li>
      <input class="toggle" type="checkbox"/>
      <label class="label">${itemTitle.value}</label>
  </li>`
}

