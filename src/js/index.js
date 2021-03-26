const $input = document.getElementById("new-todo-title");
$input.addEventListener('keyup', addTodoItem);

const $ul = document.getElementById("todo-list");

function addTodoItem(event) {
    if (event.key === 'Enter' && event.target.value !== "") {
        const addedItem = getTodoItem($input.value);
        $ul.insertAdjacentHTML("beforeend", addedItem);
        $input.value = null;
    }
}

function getTodoItem(itemTitle) {
    return` <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${itemTitle}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`
}

