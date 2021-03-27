import { STATES } from "./constants.js";
import countItem from "./countItem.js";

export default {
  onFilterToDoItem: function onFilterToDoItem({ target }) {
    const todos = document.querySelectorAll(".todo-list > li");
    const status = target.className;

    function filterSelected(target) {
      if (target.classList.contains("selected")) {
        return;
      }
      const filters = document.querySelector(".filters").querySelectorAll("a");
      for (const filter of filters) {
        if (target.classList.contains(filter.className)) {
          filter.classList.add("selected");
        } else {
          filter.classList.remove("selected");
        }
      }
    }

    function showAll() {
      console.log(todos);
      for (const todo of todos) {
        todo.style.display = "block";
      }
    }

    function showCompleted() {
      for (let todo of todos) {
        if (todo.classList.contains(STATES.COMPLETED)) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
      }
    }

    function showActive() {
      for (let todo of todos) {
        if (todo.classList.contains(STATES.ACTIVE)) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
      }
    }

    if (status === STATES.COMPLETED) {
      showCompleted();
    } else if (status === STATES.ACTIVE) {
      showActive();
    } else {
      showAll();
    }
    filterSelected(target);
    countItem.onCountItem();
  },
};
