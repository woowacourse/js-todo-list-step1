const filters = document.getElementsByClassName("filters")[0];
const todoList = document.getElementById("todo-list");

const all = filters.getElementsByClassName("all")[0];
const active = filters.getElementsByClassName("active")[0];
const completed = filters.getElementsByClassName("completed")[0];

all.addEventListener("click", onAllSelectedFilter);
active.addEventListener("click", onActiveFilter);
completed.addEventListener("click", onCompletedFilter);

function onAllSelectedFilter() {
  all.classList.add("selected");
  active.classList.remove("selected");
  completed.classList.remove("selected");

  for (const todoItem of todoList.children) {
    todoItem.style.display = "block";
  }

  onTodoCount(todoList.childElementCount);
}

function onActiveFilter() {
  all.classList.remove("selected");
  active.classList.add("selected");
  completed.classList.remove("selected");

  let countOfActiveItem = 0;

  for (const todoItem of todoList.children) {
    if (todoItem.classList.contains("completed")) {
      todoItem.style.display = "none";
    } else {
      todoItem.style.display = "block";
      countOfActiveItem += 1;
    }
  }

  onTodoCount(countOfActiveItem);
}

function onCompletedFilter() {
  all.classList.remove("selected");
  active.classList.remove("selected");
  completed.classList.add("selected");

  let countOfCompltedItem = 0;

  for (const todoItem of todoList.children) {
    if (todoItem.classList.contains("completed")) {
      todoItem.style.display = "block";
      countOfCompltedItem += 1;
    } else {
      todoItem.style.display = "none";
    }
  }

  onTodoCount(countOfCompltedItem);
}

function onTodoCount(count) {
  const todoCount = document.getElementsByClassName("todo-count")[0];
  const strongTag = todoCount.getElementsByTagName("strong")[0];
  strongTag.innerHTML = count;
}




