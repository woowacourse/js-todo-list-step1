export default {
  onCheckToDoItem: function onCheckTodoItem ({target}) {
    if(target.classList.contains('toggle')){
      return toggleOn(target);
    } else if(target.classList.contains('destroy')){
      removeItem(target);
    }
  }
}

function toggleOn(target){
  target.closest("li").classList.toggle("completed");
}

function removeItem(target){
  // remove item
}