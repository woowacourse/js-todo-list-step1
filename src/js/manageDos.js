window.onload = function(){
    const $entireToDo = document.getElementById("todo-list");;
    checkToDos($entireToDo);
    deleteToDos($entireToDo);
    editToDos($entireToDo);
    countDo();
    showConditions();
};