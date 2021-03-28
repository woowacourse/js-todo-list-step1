const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $todoCount = document.querySelector(".todo-count strong");

const $allTodo = document.querySelector(".all");
const $activeTodo = document.querySelector(".active");
const $completedTodo = document.querySelector(".completed");

$todoInput.addEventListener("keyup", addTodoItem);
$todoList.addEventListener("click", toggleCompleteTodoItem);
$todoList.addEventListener("click", deleteTodoItem);
$todoList.addEventListener("dblclick", editTodoItem);

$allTodo.addEventListener("click", displayAll);
$activeTodo.addEventListener("click", displayTodo);
$completedTodo.addEventListener("click", displayDone);

function displayAll() {
  $allTodo.classList.add("selected");
  $activeTodo.classList.remove("selected");
  $completedTodo.classList.remove("selected");

  for (const todoItem of $todoList.children) {
    todoItem.style.display = "block";
    console.log(todoItem);
  }
  updateTodoCount($todoList.childElementCount);
}

function displayTodo() {
  $allTodo.classList.remove("selected");
  $activeTodo.classList.add("selected");
  $completedTodo.classList.remove("selected");

  let todoCount = 0;
  for (const todoItem of $todoList.children) {
    if (!todoItem.classList.contains("completed")) {
      todoItem.style.display = "block";
      todoCount++;
    } else {
      todoItem.style.display = "none";
    }
  }
  updateTodoCount(todoCount);
}

function displayDone() {
  $allTodo.classList.remove("selected");
  $activeTodo.classList.remove("selected");
  $completedTodo.classList.add("selected");

  let doneCount = 0;
  for (const todoItem of $todoList.children) {
    if (todoItem.classList.contains("completed")) {
      todoItem.style.display = "block";
      doneCount++;
    } else {
      todoItem.style.display = "none";
    }
  }
  updateTodoCount(doneCount);
}

function addTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    displayAll();
  }
}

function updateTodoCount(todoCount) {
  $todoCount.textContent = todoCount;
}

function toggleCompleteTodoItem(event) {
  const todoItem = event.target.closest("li");
  const todoItemInput = todoItem.querySelector(".toggle");
  if (event.target.classList.contains("toggle")) {
    todoItem.classList.toggle("completed");
    todoItemInput.toggleAttribute("chekced");
  }
}

function deleteTodoItem(event) {
  const todoItem = event.target.closest("li");
  if (event.target.classList.contains("destroy")) {
    todoItem.remove();
    updateTodoCount($todoList.childElementCount);
  }
}

function editTodoItem(event) {
  const todoItem = event.target.closest("li");

  if (event.target.classList.contains("label")) {
    todoItem.classList.add("editing");
    const editingTodoItem = todoItem.querySelector(".edit");
    editingTodoItem.value = todoItem.querySelector(".label").textContent;
    editingTodoItem.addEventListener("keyup", putNewText);
  }
}

function putNewText(event) {
  const todoItem = event.target.closest("li");
  const todoItemText = todoItem.querySelector(".label").textContent;
  const todoItemNewText = event.target.value;

  if (event.key === "Enter" && todoItemNewText !== "") {
    todoItem.querySelector(".label").textContent = todoItemNewText;
    todoItem.classList.remove("editing");
  } else if (event.key === "Escape") {
    todoItem.querySelector(".label").textContent = todoItemText;
    todoItem.classList.remove("editing");
  }
}

function editTodoItemInnerText(event) {
  const InnerText = event.target.value;
  if (event.key === "Enter" && InnerText !== "") {
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
