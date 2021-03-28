const deleteTodoList = document.getElementById("todo-list");
deleteTodoList.addEventListener("click", onDeleteTodoItem);

function onDeleteTodoItem(event) {
  if (event.target && event.target.nodeName === "BUTTON") {
    document.getElementById(event.target.id).remove();
    onTodoCount(document.getElementById("todo-list"));
  }
}

function onTodoCount(todoList) {
  const todoCount = document.getElementsByClassName("todo-count")[0];
  const strongTag = todoCount.getElementsByTagName("strong")[0];
  strongTag.innerHTML = todoList.childElementCount;
}
