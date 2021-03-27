export default {
  onCountItem: function count() {
    const todos = document.querySelector(".todo-list").querySelectorAll("li");
    document.querySelector(".todo-count").innerHTML =
      "총 " + `<strong>${todos.length}</strong>` + " 개";
  },
};
