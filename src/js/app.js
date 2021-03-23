function enterTodoItem() {
    if (window.event.keyCode == 13) {
        let todo = document.createElement('li');
        let todoList = document.getElementById('todo-list');
    
        todo.innerHTML =
            `<div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${inputTodoItem()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${inputTodoItem()}" />`

        todoList.appendChild(todo);
    }
}

function inputTodoItem() {
    let input = document.getElementById('new-todo-title').value;
    document.getElementById('new-todo-title').value = '';
    return input;
}