const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

const $filters = document.querySelector('ul[class=filters]')
const $all = document.querySelector('a[class=all]');
const $active = document.querySelector('a[class=active]');
const $completed = document.querySelector('a[class=completed]');

$todoInput.addEventListener('keyup', onAddTodoItem);
$todoList.addEventListener('click', onToggleTodoItem);
$todoList.addEventListener('click', onRemoveTodoItem);
$todoList.addEventListener('dblclick', onChangeToEditMode);
$todoList.addEventListener('keyup', onFinishedEditMode);
$filters.addEventListener('click', onSelectShowTodoItems);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.querySelector("#todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    renderTodoItems();
  }
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
    renderTodoItems();
  }
}

function renderTodoItems() {
  if ($active.classList.contains('selected')) {
    onSelectActiveItems();
    return;
  }
  if ($completed.classList.contains('selected')) {
    onSelectCompletedItems();
    return;
  }
  onSelectAllTodoItems();
  const todoItems = $todoList.querySelectorAll('li');
  const count = todoItems.length;
  setCount(count);
}

function onChangeToEditMode(event) {
    event.preventDefault();
    const target = event.target;
    const todoItem = target.closest('li');
    if (target.className === 'label' && todoItem.className !== 'editing') {
        todoItem.classList.toggle('editing');
    }
}

function onFinishedEditMode(event) {
  event.preventDefault();
  const target = event.target;

  if (target && event.key === 'Escape') {
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

function onSelectShowTodoItems(event) {
  const target = event.target;

  if (target && target.classList.contains('active')) {
    onSelectActiveItems();
    return;
  }
  if (target && target.classList.contains('completed')) {
    onSelectCompletedItems();
    return;
  }
  onSelectAllTodoItems();
  const todoItems = $todoList.querySelectorAll('li');
  const count = todoItems.length;
  setCount(count);
}

function onSelectAllTodoItems() {
  removeSelection();
  $all.classList.toggle('selected');

  const todoItems = $todoList.querySelectorAll('li');
  todoItems.forEach(element => {
  element.style.display = "block";
  })

  const count = todoItems.length;
  setCount(count);
}

function onSelectActiveItems() {
  removeSelection();
  $active.classList.toggle('selected');

  const todoItems = $todoList.querySelectorAll('li');
  let count = 0;
  todoItems.forEach(element => {
    if (element.classList.contains("completed")) {
      element.style.display = "none";
    } else {
      count += 1;
      element.style.display = "block";
    }
    setCount(count);
  })
}

function onSelectCompletedItems() {
  removeSelection();
  $completed.classList.toggle('selected');

  const todoItems = $todoList.querySelectorAll('li');
  let count = 0;
  todoItems.forEach(element => {
    if (element.classList.contains("completed")) {
      count += 1;
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  })
  setCount(count);
}

function removeSelection() {
  $all.classList.remove('selected');
  $active.classList.remove('selected');
  $completed.classList.remove('selected');
}

function setCount(count) {
  const todoCount = document.querySelector('span[class=todo-count]');
  const strong = todoCount.querySelector('strong');

  strong.textContent = count;
}
