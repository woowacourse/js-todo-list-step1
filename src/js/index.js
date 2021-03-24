let toDoItemIndex = 0;

function addTodoList() {
    const ul = document.getElementById("todo-list");
    const input = document.getElementById("new-todo-title");
    ul.innerHTML += `<li class="false" id="${toDoItemIndex}">
        <div class="view">
            <input class="toggle" type="checkbox" id="${toDoItemIndex}"/>
            <label class="label">${input.value}</label>
            <button class="destroy" id="${toDoItemIndex}"></button>
        </div>
        <input class="edit" value="${input.value}"/>
    </li>`;
    toDoItemIndex++;
    input.value = "";
}

function checkTodoItem(event) {
    if (event.target.className === 'toggle' && event.target.checked) {
        event.target.closest("li").className = 'completed';
        event.target.toggleAttribute('checked');
    }
    if (event.target.className === 'toggle' && !event.target.checked) {
        event.target.closest("li").className = 'false';
        event.target.removeAttribute('checked');
    }
}

function removeTodoItem(event) {
    if (event.target.className === 'destroy') {
        event.target.closest("ul").removeChild(event.target.closest("li"));
    }
}

document.getElementById("new-todo-title").addEventListener('change', addTodoList);

document.addEventListener('click', checkTodoItem);

document.addEventListener('click', removeTodoItem);
