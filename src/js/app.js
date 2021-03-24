let newTodo = document.getElementById('new-todo-title');

newTodo.addEventListener("keyup", enterTodoItem);

function enterTodoItem() {
    if (window.event.keyCode == 13) {
        let li = document.createElement('li');
    
        li.classList.add('false');
        li.innerHTML =
            `<div class="view">
                <input class="toggle" type="checkbox" onclick="clickCheckbox(this)"/>
                <label class="label">${inputTodoItem()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${inputTodoItem()}" />`

        document.getElementById('todo-list').appendChild(li);
    }
}

function inputTodoItem() {
    let input = document.getElementById('new-todo-title').value;
    
    document.getElementById('new-todo-title').value = '';
    return input;
}

function clickCheckbox(self) {
    let li = self.parentNode.parentNode;

    if (li.classList.contains('false')) {
        self.setAttribute('checked', '');
        li.classList.replace('false', 'completed');
    }
    else if (li.classList.contains('completed')) {
        self.removeAttribute('checked');
        li.classList.replace('completed', 'false');
    }
}