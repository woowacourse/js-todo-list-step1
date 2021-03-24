let newTodo = document.getElementById('new-todo-title');

newTodo.addEventListener("keyup", enterTodoItem);

function enterTodoItem() {
    if (window.event.keyCode == 13) {
        let li = document.createElement('li');
        let input = inputTodoItem();
    
        li.classList.add('false');
        li.innerHTML =
            `<div class="view">
                <input class="toggle" type="checkbox" onclick="clickCheckbox(this)"/>
                <label class="label" ondblclick="editTodoItem(this)">${input}</label>
                <button class="destroy" onclick="deleteTodoItem(this)"></button>
            </div>
            <input class="edit" value="${input}" />`

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

function deleteTodoItem(self) {
    let li = self.parentNode.parentNode;
    let ul = li.parentNode;

    ul.removeChild(li);
}

function editTodoItem(self) {
    let li = self.parentNode.parentNode;

    li.classList.add('editing');

    li.addEventListener('keyup', function(event) {
        if (event.keyCode == 27) {
            li.classList.remove('editing'); 
        }
        else if (event.keyCode == 13) {
            li.classList.remove('editing');
            self.innerHTML = li.querySelector('.edit').value;
        }
    })
}