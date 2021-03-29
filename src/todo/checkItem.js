import { STATES } from "./constants.js";
import countItem from "./countItem.js";

export default {
  onCheckToDoItem: function ({ target }) {
    if (target.classList.contains("toggle")) {
      toggleOn(target);
    } else if (target.classList.contains("destroy")) {
      removeItem(target);
    }
    countItem.onCountItem();
  },
};

function toggleOn(target) {
  const $targetToggle = target.closest("li").classList;
  const $filterState = document.querySelector(".selected").classList;

  if ($targetToggle.contains(STATES.ACTIVE)) {
    $targetToggle.toggle(STATES.COMPLETED);
    $targetToggle.remove(STATES.ACTIVE);
    $targetToggle.add(STATES.COMPLETED);

    if ($filterState.contains(STATES.ACTIVE)) {
      target.parentElement.parentElement.classList.add("d-none");
    }
    return;
  }
  if ($targetToggle.contains(STATES.COMPLETED)) {
    $targetToggle.toggle(STATES.COMPLETED);
    $targetToggle.remove(STATES.COMPLETED);
    $targetToggle.add(STATES.ACTIVE);

    if ($filterState.contains(STATES.COMPLETED)) {
      target.parentElement.parentElement.classList.add("d-none");
    }
    return;
  }
}

function removeItem(target) {
  target.parentNode.parentElement.remove();
}
