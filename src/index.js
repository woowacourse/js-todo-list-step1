document.getElementById('new-todo-title').addEventListener('keydown', addTodoItem);

function addTodoItem(e) {
    console.log(e.keyCode);
    if (e.keyCode != 13) {
        return
    }
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('new-todo-title').value;
    console.log(todoTitle);

    const li = document.createElement('li');
    li.setAttribute('class', 'editing')

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'toggle');
    input.addEventListener('click', toggleTodoItem)

    const title = document.createElement('label');
    title.setAttribute('class', 'label');
    title.append(todoTitle);

    const button = document.createElement('button');
    button.setAttribute('class', 'destroy');
    button.addEventListener('click', deleteTodoItem)

    li.appendChild(input);
    li.appendChild(title);
    li.appendChild(button);

    todoList.appendChild(li);

}

function toggleTodoItem(e) {
    let todoItem = e.target.parentElement;
    if (e.target.checked) {
        todoItem.className = 'completed';
        return
    }

    todoItem.removeAttribute('class');
}

function deleteTodoItem(e) {
    let todoList = document.getElementById('todo-list');
    let todoItem = e.target.parentElement;
    todoList.removeChild(todoItem);
}