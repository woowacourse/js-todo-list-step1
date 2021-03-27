import { STATES } from "./constants.js";
import countItem from "./countItem.js";

export default {
  onFilterToDoItem: function onFilterToDoItem(event) {
    const todos = document.querySelectorAll(".todo-list > li");
    const status = event.target.className;

    function showAll() {
      console.log(todos);
      for (const todo of todos) {
        todo.style.display = "block";
      }
    }

    function showCompleted() {
      console.log(todos);
      for (let todo of todos) {
        if (todo.classList.contains(STATES.COMPLETED)) {
          todo.style.display = "block";
        } else if (todo.classList.contains(STATES.ACTIVE)) {
          todo.style.display = "none";
        }
      }
    }

    function showActive() {
      console.log(todos);
      for (let todo of todos) {
        if (todo.classList.contains(STATES.ACTIVE)) {
          todo.style.display = "block";
        } else if (todo.classList.contains(STATES.COMPLETED)) {
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
    countItem.onCountItem();
  },
};
