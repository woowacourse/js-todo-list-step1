import { STATES } from "./constants.js";
import countItem from "./countItem.js";

export default {
  onCheckToDoItem: function ({ target }) {
    if (target.classList.contains("toggle")) {
      return toggleOn(target);
    } else if (target.classList.contains("destroy")) {
      removeItem(target);
      countItem.onCountItem();
    }
  },
};

function toggleOn(target) {
  if (target.classList.contains(STATES.ACTIVE)) {
    target.closest("li").classList.toggle(STATES.COMPLETED);
    target.classList.replace(STATES.ACTIVE, STATES.COMPLETED);
    return;
  }
  target.closest("li").classList.toggle(STATES.COMPLETED);
  target.classList.replace(STATES.COMPLETED, STATES.ACTIVE);
}

function removeItem(target) {
  target.parentNode.parentElement.remove();
}
