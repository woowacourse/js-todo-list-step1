import { STATES } from "./constants.js";
import countItem from "./countItem.js";

export default {
  onFilterToDoItem: function onFilterToDoItem({ target }) {
    const todos = document.querySelectorAll(".todo-list > li");
    const status = target.classList;

    function renderFilters(target) {
      const filters = document.querySelector(".filters").querySelectorAll("a");
      for (const filter of filters) {
        if (target.classList.contains(filter.className)) {
          filter.classList.add("selected");
        } else {
          filter.classList.remove("selected");
        }
      }
    }

    function filterSelected(target) {
      if (target.classList.contains("selected")) {
        return;
      }
      renderFilters(target);
    }

    function showAll() {
      for (const todo of todos) {
        todo.classList.remove("d-none");
      }
    }

    function showCompleted(target) {
      if (target.classList.contains("selected")) {
        return;
      }
      for (let todo of todos) {
        if (todo.classList.contains(STATES.COMPLETED)) {
          todo.classList.remove("d-none");
        } else {
          todo.classList.add("d-none");
        }
      }
    }

    function showActive(target) {
      if (target.classList.contains("selected")) {
        return;
      }
      for (let todo of todos) {
        if (todo.classList.contains(STATES.ACTIVE)) {
          todo.classList.remove("d-none");
        } else {
          todo.classList.add("d-none");
        }
      }
    }

    if (status.contains(STATES.COMPLETED)) {
      showCompleted(target);
    } else if (status.contains(STATES.ACTIVE)) {
      showActive(target);
    } else {
      showAll();
    }
    filterSelected(target);
    countItem.onCountItem();
  },
};
