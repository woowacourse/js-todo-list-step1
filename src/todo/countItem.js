export default {
  onCountItem: function count() {
    const todos = document.querySelector(".todo-list").querySelectorAll("li");
    let visible = 0;
    for (const todo of todos) {
      if (todo.style.display !== "none") {
        visible++;
      }
    }
    document.querySelector(".todo-count").innerHTML =
      "총 " + `<strong>${visible}</strong>` + " 개";
  },
};
