const toggleTodoList = document.getElementById("todo-list");
toggleTodoList.addEventListener("click", onToggleTodoItem);

function onToggleTodoItem(event) {
  if (event.target && event.target.className === "toggle") {
    event.target.toggleAttribute("checked");
    event.target.closest("li").classList.toggle("completed");
  }
}
