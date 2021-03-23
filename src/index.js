let inputText = document.getElementById('new-todo-title');

inputText.addEventListener("keydown", addTodo);

function addNewItem(list, itemText){
    list.appendChild(createHtml(itemText));
}

function createHtml(itemText) {
    let kanban = document.createElement('li');
    kanban.innerHTML = '<div class="view">' + 
    '<input class="toggle" type="checkbox"/>' + 
    '<label class="label">' +
    itemText +
    '</label>' +
    '<button class="destroy"></button>' +
    '</div>';
    return kanban
}

function addTodo(e) {
    if (e.key === "Enter") {
        let itemText = inputText.value;
        addNewItem(document.getElementById('todo-list'), itemText);
        inputText.value = '';
    }
}