window.onload = function() {
    const newTodo = document.getElementById("new-todo-title");
    const todoList = document.getElementById("todo-list");
    const listCount = document.getElementsByClassName("todo-count");

    newTodo.addEventListener("keydown",inputTodo);
    function inputTodo(e) {
        if(e.keyCode == 13){
            const inputText = newTodo.value;
            const newTodoLI = document.createElement('li');
            newTodoLI.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${inputText}</label>
                <button class="destroy"></button>
            </div>`;
            todoList.appendChild(newTodoLI);
        }
    }
}