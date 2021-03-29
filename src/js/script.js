const $todoList = document.getElementById("todo-list");
const $todoInput = document.getElementById("new-todo-title");
const $todoCount = document.getElementById("todo-count");

$todoList.addEventListener("click", onClickEventForTodoList);
$todoList.addEventListener("dblclick", onDoubleClickEventForTodoList);
$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  if (event.key === "Enter" && todoTitle !== "") {
    $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
    updateTodoCount($todoList.getElementsByTagName("li").length);
  }
}

function renderTodoItemTemplate(title) {
  return `<li>
  <div class="view">
    <input class="toggle" type="checkbox"/>
    <label class="label" id="title">${title}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="새로운 타이틀" />
  </li>`;
}

function onClickEventForTodoList(event) {
  if (event.target.nodeName === "INPUT" && event.target.className=="toggle") {
    event.target.closest("li").classList.toggle("completed");
  }
  if (event.target.nodeName === "BUTTON") {
    const liToDestroy = event.target.closest("li");
    if (confirm("정말로 삭제하시겠습니까?")) {
      $todoList.removeChild(liToDestroy);
      updateTodoCount($todoList.getElementsByTagName("li").length);
    }
  }
}

function updateTodoCount(count) {
  $todoCount.innerHTML = `총 <strong>${count}</strong> 개`;
}

function onDoubleClickEventForTodoList(event) {
  const clickedLi = event.target.closest("li");
  const label = clickedLi.getElementsByTagName("label")[0];
  const edit = clickedLi.getElementsByClassName("edit")[0];

  edit.value = label.innerHTML;
  clickedLi.classList.add("editing");

  edit.addEventListener('keydown', event => {
    if (event.key === "Escape") {
      clickedLi.classList.remove("editing");
    }
    if (event.key === "Enter") {
      const newTitle = edit.value;
      label.innerHTML = newTitle;
      clickedLi.classList.remove("editing");
    }
  });
}