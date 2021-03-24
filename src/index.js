document.getElementById('new-todo-title').addEventListener('keydown', e=> {
    addTodoItem(e)
});

function addTodoItem(e) {
    console.log(e.keyCode);
    if (e.keyCode != 13) {
        return
    }
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('new-todo-title').value;
    console.log(todoTitle);

    const li = document.createElement('li');
    li.setAttribute('class', 'todo-item')

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'toggle');

    const title = document.createElement('label');
    title.setAttribute('class', 'label');
    title.append(todoTitle);

    const button = document.createElement('button');
    button.setAttribute('class', 'destroy');

    li.appendChild(input);
    li.appendChild(title);
    li.appendChild(button);

    todoList.appendChild(li);

}