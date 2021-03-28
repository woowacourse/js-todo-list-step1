const toggleTodoInput = document.getElementById("todo-list");
toggleTodoInput.addEventListener("dblclick", onChangeEditModeTodoItem);

function onChangeEditModeTodoItem(event) {
  const label = event.target;

  if (label && label.nodeName === "LABEL") {
    const list = label.closest("li");
    list.classList.add("editing");

    list.addEventListener("keyup", function(e){
      const editInput = e.target;

      if (e.key === "Enter" && editInput.value !== "") {

        label.innerText = editInput.value;
        list.classList.remove("editing");

      } else if (e.key === "Escape") {

        editInput.value = label.innerText;
        list.classList.remove("editing");

      }
    });
  }
}
