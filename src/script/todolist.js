const $todoInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

$todoInput.addEventListener('keyup', addTodoItem);

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($todoInput);
        $todoList.insertAdjacentHTML("beforeend", addedItem);
        $todoInput.value = null;  // input clear
    }
}

function getTodoItem(itemTitle) {
    return ` <li>
      
      <label class="label">${itemTitle.value}</label>
  </li>`
}

