
const checkToDos = ($entireToDo) => {
    $entireToDo.addEventListener("click", function(e) {
        if (e.target && e.target.type == "checkbox") {
            onToggleTodoItem(e);
        }
    })
}


const clickToDo = (event) => {
    event.currentTarget.checked = true;
    const $toDoLi = event.currentTarget.parentNode.parentNode;
    $toDoLi.setAttribute("class", "completed");
}

function onToggleTodoItem(event) {
    event.target.closest("li").classList.toggle("completed");
}