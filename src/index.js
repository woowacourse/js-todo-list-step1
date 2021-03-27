const $todoInput = document.querySelector("#new-todo-title");
const $toDoList = document.querySelector(".todo-list");
const $filter = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toDoList.addEventListener("click", onToggleTodoItem);
$toDoList.addEventListener("click", onDestoryItem);
$toDoList.addEventListener("dblclick", edit);
$filter.addEventListener("click", filterTodo);

state = 0;

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    updateCount();
  }
}

function onToggleTodoItem(event) {
    if(event.target.className == "toggle"){
        event.target.closest("li").classList.toggle("completed");
    }
}

function renderTodoItemTemplate(title) {
  return ` <li class="todo-item">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="">
              </li>`;
}

function onDestoryItem(event) {
  if(event.target.className == "destroy"){
    const destroy = event.target.parentNode.parentNode
    destroy.remove()
    updateCount();
  }
}

function edit(event) {
  if(event.target.className == "label"){
    const $TodoItem = event.target.closest('li')
    const editInput = $TodoItem.querySelector('.edit')

    if(!$TodoItem.classList.contains('editing')) {
      $TodoItem.classList.toggle('editing');
    }

    editInput.addEventListener('keyup', (e) => {
      if(e.key == 'Enter') {
        $TodoItem.classList.remove('editing')
        event.target.textContent = editInput.value
      }
      if(e.key == 'Esc' || e.key == 'Escape') {
        editInput.value = event.target.textContent
        $TodoItem.classList.remove('editing')
        return;
      }
    })
  }
}

function updateCount() {
  const todoItems = document.querySelectorAll(".todo-item");
  if(state == 0) { 
    document.querySelector('.count').innerHTML = document.querySelectorAll(".todo-item").length;
    return;
  }
  if(state == 1) {
    count = 0;
    todoItems.forEach(element => {
      if(element.classList.contains("completed")){
        count = count + 1;
      }
    });
    document.querySelector('.count').innerHTML = count;
    return;
  }
  if(state == 2) {
    count = 0;
    todoItems.forEach(element => {
      if(!element.classList.contains("completed")){
        count = count + 1;
      }
    });
    document.querySelector('.count').innerHTML = count;
    return;
  }
}

function filterTodo(event) {
  const buttonName = event.target.className;
  const todoItems = document.querySelectorAll(".todo-item");
  const count = 0;
  if(buttonName == "active") {
    onlyToDo(todoItems);
  }

  if(buttonName == "completed") {
    completed(todoItems);
  }

  if(buttonName == "all selected") {
    allSelect(todoItems);
  }
}

function completed(todoItems) { 
  count = 0;
  todoItems.forEach(element => {
    if(element.classList.contains("completed")){
      element.style.display = "block";
      count = count + 1;
    }
    else {
      element.style.display = "none";
    }
  });
  state = 1;
  updateCount();
}

function onlyToDo(todoItems) { 
  count = 0;
  todoItems.forEach(element => {
    if(element.classList.contains("completed")){
      element.style.display = "none";
    }
    else {
      element.style.display = "block";
      count = count + 1;
    }
  });
  state = 2;
  updateCount();
}

function allSelect(todoItems) {
  count = 0;
  todoItems.forEach(element => {
      element.style.display = "block";
      count = count + 1;
  });
  state = 0;
  updateCount();
}