let toDoItemIndex = 0;

function addTodoList() {
    const ul = document.getElementById('todo-list');
    const input = document.getElementById('new-todo-title');
    ul.innerHTML += `<li class="false" id="${toDoItemIndex}">
        <div class="view">
            <input class="toggle" type="checkbox" id="${toDoItemIndex}"/>
            <label class="label">${input.value}</label>
            <button class="destroy" id="${toDoItemIndex}"></button>
        </div>
        <input class="edit" value="${input.value}"/>
    </li>`;
    toDoItemIndex++;
    input.value = '';
    const span = document.querySelector('.todo-count');
    span.innerHTML = `<strong>총 ${ul.childNodes.length} 개</strong>`;
}

function checkTodoItem(event) {
    if (event.target.className === 'toggle' && event.target.checked) {
        event.target.closest('li').className = 'completed';
        event.target.toggleAttribute('checked');
    }
    if (event.target.className === 'toggle' && !event.target.checked) {
        event.target.closest('li').className = 'false';
        event.target.removeAttribute('checked');
    }
}

function removeTodoItem(event) {
    const ul = document.getElementById('todo-list');
    if (event.target.className === 'destroy') {
        event.target.closest('ul').removeChild(event.target.closest('li'));
        const span = document.querySelector('.todo-count');
        span.innerHTML = `<strong>총 ${ul.childNodes.length} 개</strong>`;
    }
}

function showInputTodoItemToEdit(event) {
    if (event.target.className === 'label') {
        event.target.closest('li').classList.add('editing');
    }
}

function editTodoItem(event) {
    if (event.keyCode === 27 && event.target.className === 'edit') {
        event.target.value = event.target.getAttribute('value');
        event.target.closest('li').classList.remove('editing');
    }
    if (event.keyCode === 13 && event.target.className === 'edit') {
        const div = event.target.previousSibling.previousSibling;
        div.childNodes[3].textContent = event.target.value;
        event.target.setAttribute('value', event.target.value);
        event.target.closest('li').classList.remove('editing');
    }
}

document.getElementById('new-todo-title').addEventListener('change', addTodoList);

document.addEventListener('click', checkTodoItem);

document.addEventListener('click', removeTodoItem);

document.addEventListener('dblclick', showInputTodoItemToEdit);

document.addEventListener('keydown', editTodoItem);

