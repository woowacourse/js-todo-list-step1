export default {
  onEditTodoItem: function onEditTodoItem({ target }) {
    if (target.classList.contains("toggle")) {
      return;
    }
    const $editTarget = target.closest("li");
    $editTarget.classList.add("editing");

    const editInputs = document.querySelectorAll(".edit");
    for (const editInput of editInputs) {
      editInput.addEventListener("keyup", registerEditedItem);
    }
  },
};

function registerEditedItem({ target, key }) {
  if (key === "Escape") {
    target.parentElement.classList.remove("editing");
  } else if (key === "Enter") {
    target.parentElement.querySelector("label").innerHTML = target.value;
    target.parentElement.classList.remove("editing");
  }
}
