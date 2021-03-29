export default {
  onCountItem: function count() {
    const todos = document.querySelectorAll(".todo-list > li");
    let visible = 0;
    for (const todo of todos) {
      if (!todo.classList.contains("d-none")) {
        visible++;
      }
    }
    document.querySelector(".todo-count").innerHTML =
      "총 " + `<strong>${visible}</strong>` + " 개";
  },
};
