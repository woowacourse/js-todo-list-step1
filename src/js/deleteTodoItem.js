const toggleTodoInput = document.getElementById("todo-list");
toggleTodoInput.addEventListener("click", onDeleteTodoItem);

function onDeleteTodoItem(event) {
  if (event.target && event.target.nodeName === "BUTTON") {
    document.getElementById(event.target.id).remove();
  }
}
