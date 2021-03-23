window.onload = function() {
    const newTodo = document.getElementById("new-todo-title");
    const todoList = document.getElementById("todo-list");
    const listCount = document.getElementsByClassName("todo-count");

    newTodo.addEventListener("keydown",inputTodo);
    function inputTodo(e) {
        if(e.keyCode == 13){
            const inputText = newTodo.value;
            const newTodoLI = document.createElement('li');
            newTodoLI.className = "todo";
            newTodoLI.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" onclick="check(this)">
                <label class="label">${inputText}</label>
                <button class="destroy"></button>
            </div>`;
            todoList.appendChild(newTodoLI);
        }
    }
}
function check(box) {
    if (box.checked == true) {
        box.parentNode.parentNode.className = "completed";
    }
    if (box.checked == false) {
        box.parentNode.parentNode.className = "todo";
    }
}