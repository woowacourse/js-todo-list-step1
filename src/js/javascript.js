const $todoInput = document.querySelector("#new-todo-title");

$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    onClickShowAll();
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

const $changeInput = document.querySelector("#todo-list");

$changeInput.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "INPUT" && e.target.className === 'toggle') {
     onToggleTodoItem(e);
     return;
  }
  if (e.target && e.target.nodeName == "BUTTON") {
     onDestroyTodoItem(e);
     return
  }
});

function onToggleTodoItem(event) {
  event.target.closest("li").classList.toggle("completed");
  event.target.closest("input").toggleAttribute("checked");
  onClickShowAll();
}

function onDestroyTodoItem(event) {
  event.target.closest("li").parentNode.removeChild(event.target.closest("li"));
  onClickShowAll();
}

$changeInput.addEventListener("dblclick", function (e) {
  if (e.target && e.target.nodeName == "LABEL") {
     onDoubleClickTodoItem(e);
     return;
  }
});

function onDoubleClickTodoItem(event) {
  event.target.closest("li").getElementsByClassName("edit")[0].value = event.target.textContent;
  event.target.closest("li").getElementsByClassName("edit")[0].toggleAttribute("autoFocus");
  event.target.closest("li").classList.toggle("editing");
}

$changeInput.addEventListener("keyup", onEditTodoItem);

function onEditTodoItem(event) {
  const editTitle = event.target.closest("li").getElementsByClassName("edit")[0].value;
  if (event.target && event.target.nodeName == "INPUT" && event.target.className === 'edit' && event.key === "Enter" && editTitle !== "") {
    event.target.closest("li").getElementsByClassName("label")[0].textContent = editTitle;
    event.target.closest("li").classList.toggle("editing");
    return;
  }
  if (event.target && event.target.nodeName == "INPUT" && event.key === "Escape") {
    event.target.closest("li").classList.toggle("editing");
    return;
  }
}

const $showAllInput = document.querySelector("a.all");

$showAllInput.addEventListener("click", onClickShowAll);

function onClickShowAll() {
  cleanButtons();
  document.querySelector(".all").classList.add("selected");
  const todoList = document.getElementById("todo-list");
  const children = todoList.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeName == "LI") {
      children[i].classList.remove("hidden");
    }
  };
  document.getElementsByTagName("strong")[0].textContent = document.querySelector("#todo-list").childElementCount;
}

const $showUncheckedInput = document.querySelector("a.active");

$showUncheckedInput.addEventListener("click", onClickUnchecked);

function onClickUnchecked() {
  cleanButtons();
  document.querySelector(".active").classList.add("selected");
  const todoList = document.getElementById("todo-list");
  const children = todoList.childNodes;
  var count = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeName == "LI") {
      children[i].classList.remove("hidden");
    }
  };
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeName == "LI" && children[i].className === "completed") {
      count++;
      children[i].classList.add("hidden");
    }
  };
  document.getElementsByTagName("strong")[0].textContent = document.querySelector("#todo-list").childElementCount - count;
}

const $showCheckedInput = document.querySelector("a.completed");

$showCheckedInput.addEventListener("click", onClickChecked);

function onClickChecked() {
  cleanButtons();
  document.querySelector("a.completed").classList.add("selected");
  const todoList = document.getElementById("todo-list");
  const children = todoList.childNodes;
  var count = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeName == "LI") {
      children[i].classList.remove("hidden");
    }
  };
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeName == "LI" && children[i].className === "") {
      count++;
      children[i].classList.add("hidden");
    }
  };
  document.getElementsByTagName("strong")[0].textContent = document.querySelector("#todo-list").childElementCount - count;
}

function cleanButtons() {
    const buttons = document.getElementsByTagName("a");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("selected");
    }
}
