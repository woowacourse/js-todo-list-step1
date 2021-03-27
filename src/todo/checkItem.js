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
  if (target.closest("li").classList.contains(STATES.ACTIVE)) {
    target.closest("li").classList.toggle(STATES.COMPLETED);
    target.closest("li").classList.remove(STATES.ACTIVE);
    target.closest("li").classList.add(STATES.COMPLETED);
    return;
  }
  if (target.closest("li").classList.contains(STATES.COMPLETED)) {
    target.closest("li").classList.toggle(STATES.COMPLETED);
    target.closest("li").classList.remove(STATES.COMPLETED);
    target.closest("li").classList.add(STATES.ACTIVE);
    return;
  }
}

function removeItem(target) {
  target.parentNode.parentElement.remove();
}
