document.getElementById('new-todo-title').addEventListener('keydown', addTodoItem);

function addTodoItem(e) {
    console.log(e.keyCode);
    if (e.keyCode != 13) {
        return
    }
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('new-todo-title').value;

    const div = document.createElement('div');
    div.setAttribute('class', 'view');

    const li = document.createElement('li');
    li.addEventListener('dblclick', changeInputMode)

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

    const editInput = document.createElement('input')
    editInput.setAttribute('class', 'edit');
    editInput.setAttribute('value', todoTitle);
    div.appendChild(input);
    div.appendChild(title);
    div.appendChild(button);
    li.appendChild(div);
    li.appendChild(editInput);
    todoList.appendChild(li);
}

function toggleTodoItem(e) {
    let todoItem = e.target.parentElement.parentElement;
    console.log(todoItem);
    if (e.target.checked) {
        todoItem.className = 'completed';
        return
    }

    todoItem.removeAttribute('class');
}

function deleteTodoItem(e) {
    let todoList = document.getElementById('todo-list');
    let todoItem = e.target.parentElement.parentElement;
    todoList.removeChild(todoItem);
}

function changeInputMode(e) {
    let todoItem = e.target.parentElement.parentElement;
    todoItem.className = 'editing';
    todoItem.addEventListener('keydown', finishEditMode);
    todoItem.removeEventListener('dblclick', changeInputMode);
}

function finishEditMode(e) {
     if (e.keyCode == 27 ) {
         let todoItem = e.target.parentElement;
         todoItem.removeAttribute('class');
         todoItem.addEventListener('dblclick', changeInputMode);
         return
     }

     if (e.keyCode == 13) {
         let todoItem = e.target.parentElement;
         const title = todoItem.firstElementChild.getElementsByClassName('label')[0];
         const editTitle = todoItem.getElementsByClassName('edit')[0];
         title.innerHTML = editTitle.value;
         todoItem.removeAttribute('class');
         todoItem.addEventListener('dblclick', changeInputMode);
     }
}