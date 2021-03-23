let inputText = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');

inputText.addEventListener("keydown", addTodo);

function addNewItem(list, itemText){
    list.appendChild(createHtml(itemText));
}

function createHtml(itemText) {
    let kanban = document.createElement('li');
    kanban.innerHTML =
        `<div class="view">
            <input class="toggle" type="checkbox"/> 
                <label class="label">${itemText}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />`;
    let toggleElem = kanban.querySelector('.toggle');
    toggleElem.addEventListener('change', event => {
        if (event.target.checked) {
            kanban.classList.add('completed');
            toggleElem.setAttribute('checked', '');

        } else {
            kanban.classList.remove('completed');
            toggleElem.removeAttribute('checked');
        }
    });

    let destroyElem = kanban.querySelector('.destroy');
    destroyElem.addEventListener('click', event => {
        todoList.removeChild(kanban);
    })
    return kanban
}

function addTodo(e) {
    if (e.key === "Enter") {
        let itemText = inputText.value;
        addNewItem(todoList, itemText);
        inputText.value = '';
    }
}