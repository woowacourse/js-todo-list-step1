let newTodo = document.getElementById('new-todo-title');
let filters = document.querySelector('.filters').querySelectorAll('li');

showAllList();
showTodoList();
showDoneList();

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
        
        countTodoItems();
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

    countTodoItems();
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

function countTodoItems() {
    let views = document.getElementsByClassName('view');
    let todos = document.querySelector('.todo-count');

    todos.innerHTML = `총 <strong>${views.length}</strong> 개`;
}

function showAllList() {
    filters[0].addEventListener('click', function() {
        let todoList = document.getElementById('todo-list').querySelectorAll('li');
        let todos = document.querySelector('.todo-count');

        filters[0].querySelector('.all').classList.add('selected');
        filters[1].querySelector('.active').classList.remove('selected');
        filters[2].querySelector('.completed').classList.remove('selected');

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].classList.contains('false')) {
                todoList[i].style.display = 'block';
            }
            if (todoList[i].classList.contains('completed')) {
                todoList[i].style.display = 'block';
            }
        }
        
        todos.innerHTML = `총 <strong>${todoList.length}</strong> 개`;
    })
}

function showTodoList() {
    filters[1].addEventListener('click', function() {
        let todoList = document.getElementById('todo-list').querySelectorAll('li');
        let todos = document.querySelector('.todo-count');
        let count = 0;

        filters[0].querySelector('.all').classList.remove('selected');
        filters[1].querySelector('.active').classList.add('selected');
        filters[2].querySelector('.completed').classList.remove('selected');

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].classList.contains('false')) {
                todoList[i].style.display = 'block';
                count++;
            }
            if (todoList[i].classList.contains('completed')) {
                todoList[i].style.display = 'none';
            }
        }
        
        todos.innerHTML = `총 <strong>${count}</strong> 개`;
    })
}

function showDoneList() {
    filters[2].addEventListener('click', function() {
        let todoList = document.getElementById('todo-list').querySelectorAll('li');
        let todos = document.querySelector('.todo-count');
        let count = 0;

        filters[0].querySelector('.all').classList.remove('selected');
        filters[1].querySelector('.active').classList.remove('selected');
        filters[2].querySelector('.completed').classList.add('selected');

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].classList.contains('false')) {
                todoList[i].style.display = 'none';
            }
            if (todoList[i].classList.contains('completed')) {
                todoList[i].style.display = 'block';
                count++;
            }
        }

        todos.innerHTML = `총 <strong>${count}</strong> 개`;
    })
}