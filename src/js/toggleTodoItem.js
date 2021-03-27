const toggleTodoInput = document.getElementById("todo-list");
toggleTodoInput.addEventListener("click", onToggleTodoItem);

function onToggleTodoItem(event) {
  if (event.target && event.target.nodeName === "INPUT") {
    event.target.toggleAttribute("checked");
    event.target.closest("li").classList.toggle("completed");
  }
}
