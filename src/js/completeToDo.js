
const checkToDos = () => {
    const $toDos = document.getElementsByClassName("toggle");

    Array.prototype.forEach.call($toDos, function($toDo) {
        $toDo.addEventListener('click',clickToDo);
    });

    return;
}


const clickToDo = (event) => {
    event.currentTarget.checked = true;
    const $toDoLi = event.currentTarget.parentNode.parentNode;
    $toDoLi.setAttribute("class", "completed");
}