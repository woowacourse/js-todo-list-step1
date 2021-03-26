const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

$todoInput.addEventListener('keyup', onAddTodoItem);
$todoList.addEventListener('click', onToggleTodoItem);
$todoList.addEventListener('click', onRemoveTodoItem);
$todoList.addEventListener('dblclick', onChangeToEditMode);
$todoList.addEventListener('keyup', onFinishedEditMode);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.querySelector("#todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    onAddIncreaseTodoItemCount();
  }
}

function onAddIncreaseTodoItemCount() {
  const todoCount = document.querySelector('span[class=todo-count]');
  const strong = todoCount.querySelector('strong');
  strong.textContent = parseInt(strong.textContent, 10) + 1;
}

function onToggleTodoItem(event) {
  const target = event.target;
  if (target && target.className === "toggle") {
    target.closest("li").classList.toggle("completed");
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

function onRemoveTodoItem(event) {
  const target = event.target;
  if (target && target.className === "destroy") {
    const li = target.parentNode.parentNode;
    li.parentNode.removeChild(li);
    onRemoveDecreaseTodoItemCount();
  }
}

function onRemoveDecreaseTodoItemCount() {
  const todoCount = document.querySelector('span[class=todo-count]');
  const strong = todoCount.querySelector('strong');
  strong.textContent = parseInt(strong.textContent, 10) - 1;
}

function onChangeToEditMode(event) {
    event.preventDefault();
    const target = event.target;
    const todoItem = target.closest('li');
    if (todoItem.className !== 'editing') {
        todoItem.classList.toggle('editing');
    }
}

function onFinishedEditMode(event) {
  event.preventDefault();
  const target = event.target;

  if (target && target.className === 'edit' && event.key === 'Escape') {
    document.getSelection().anchorNode.classList.remove('editing');
  } else if (target && target.value !== "" &&
  target.className === 'edit' && event.key === 'Enter') {
    onUpdate(target);
    document.getSelection().anchorNode.classList.remove('editing');
  }
}

function onUpdate(target) {
  const div = target.closest('li').querySelector('div');
  const originalLabel = div.querySelector('label');
  const newLabel = document.createElement('label');
  newLabel.className = 'label';
  newLabel.textContent = target.value;
  div.replaceChild(newLabel, originalLabel);
}
