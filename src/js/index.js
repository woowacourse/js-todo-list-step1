let toDoItemIndex = 0;

function addToDoList() {
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
    input.value = null;
}

document.getElementById("new-todo-title").addEventListener('change', addToDoList);

document.addEventListener('click', function (e) {
    if (e.target.className === 'toggle' && e.target.checked) {
        e.target.parentNode.parentNode.className = 'completed';
        e.target.toggleAttribute('checked');
    }
    if (e.target.className === 'toggle' && !e.target.checked) {
        e.target.parentNode.parentNode.className = 'false';
        e.target.removeAttribute('checked');
    }
})