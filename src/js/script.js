const domParser = new DOMParser();

const $todoList = document.getElementById("todo-list");
const $todoInput = document.getElementById("new-todo-title");
const $todoCount = document.getElementById("todo-count");
const $filters = document.getElementById("filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
addEventToFilters();

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key === "Enter" && todoTitle !== "") {
    const todoItem = parseToDom(renderTodoItemTemplate(todoTitle));
    const toggle = todoItem.querySelector(".toggle");
    toggle.addEventListener("click", (event) => event.target.closest("li").classList.toggle("completed"));

    const destroyButton = todoItem.querySelector(".destroy");
    destroyButton.addEventListener("click", onClickToRemove);

    const label = todoItem.querySelector(".label");
    label.addEventListener("dblclick", onDoubleClickToRemoveTodoItem);

    $todoList.appendChild(todoItem);

    event.target.value = "";
    updateTodoCount();
  }
}

function parseToDom(template) {
  return domParser.parseFromString(template, "text/html").body.firstElementChild;
}

function renderTodoItemTemplate(title) {
  return `<li class="todoItem">
  <div class="view">
    <input class="toggle" type="checkbox"/>
    <label class="label">${title}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="" />
  </li>`;
}

function onClickToRemove(event) {
  const liToDestroy = event.target.closest("li");
  if (confirm('정말로 삭제하시겠습니까?')) {
    $todoList.removeChild(liToDestroy);
    updateTodoCount();
  }
}

function updateTodoCount() {
  const count = $todoList.getElementsByTagName("li").length;
  $todoCount.innerHTML = `총 <strong>${count}</strong> 개`;
}

function onDoubleClickToRemoveTodoItem(event) {
  const todoItem = event.target.closest("li");
  const label = todoItem.querySelector(".label");
  const edit = todoItem.querySelector(".edit");

  edit.value = label.innerHTML;
  todoItem.classList.add("editing");

  edit.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      todoItem.classList.remove("editing");
    }
    if (event.key === "Enter") {
      const newTitle = edit.value;
      label.innerHTML = newTitle;
      todoItem.classList.remove("editing");
    }
  });
}

function addEventToFilters() {
  const allSelected = $filters.querySelector(".allselected");
  const active = $filters.querySelector(".active");
  const completed = $filters.querySelector(".completed");

  allSelected.addEventListener("click", event => {
    const todoItems = $todoList.querySelectorAll(".todoItem");
    Array.from(todoItems)
      .forEach(todoItem => todoItem.style.display = "inline");
  });

  active.addEventListener("click", event => {
    const todoItems = $todoList.querySelectorAll(".todoItem");
    Array.from(todoItems)
      .forEach(todoItem => {
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "inline";
        }
        else {
          todoItem.style.display = "none";
        }
      });
  });

  completed.addEventListener("click", event => {
    const todoItems = $todoList.querySelectorAll(".todoItem");
    Array.from(todoItems)
      .forEach(todoItem => {
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "inline";
        }
        else {
          todoItem.style.display = "none";
        }
      });
  });
}
