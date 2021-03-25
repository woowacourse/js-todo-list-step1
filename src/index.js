window.addEventListener('hashchange', function () {
    const filter = location.href.split("#")[1]
    changeFilter(filter);
});

document.getElementById('new-todo-title').addEventListener('keydown', addTodoItem);

function addTodoItem(e) {
    console.log(e.keyCode);
    if (e.keyCode != 13) {
        return
    }
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('new-todo-title');

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
    title.innerHTML = todoTitle.value;

    const button = document.createElement('button');
    button.setAttribute('class', 'destroy');
    button.addEventListener('click', deleteTodoItem)

    const editInput = document.createElement('input')
    editInput.setAttribute('class', 'edit');
    editInput.setAttribute('value', todoTitle.value);

    div.appendChild(input);
    div.appendChild(title);
    div.appendChild(button);

    li.appendChild(div);
    li.appendChild(editInput);

    todoList.appendChild(li);
    countMoveItem();
    todoTitle.value = "";
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
    countMoveItem();
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

function countMoveItem() {
    const countContainer = document.getElementsByClassName('count-container')[0];
    const todoList = document.getElementById('todo-list');

    const todoCount = countContainer.getElementsByClassName('todo-count')[0];
    console.log(todoCount);
    todoCount.innerHTML = '총 <strong>' + todoList.childElementCount + '</strong> 개';
}

function changeFilter(filter) {
    let todoList = document.getElementById('todo-list');
    const liList = todoList.getElementsByTagName('li');


    for (let i = 0; i < liList.length; i++) {
        let moveItem = liList[i];
        moveItem.style.display = 'block';
    }

    if (filter === '') {
        document.getElementsByClassName('all')[0].classList.add('selected');
        document.getElementsByClassName('completed')[0].classList.remove('selected');
        document.getElementsByClassName('active')[0].classList.remove('selected');
        return;
    }

    if (filter === 'active') {
        document.getElementsByClassName('all')[0].classList.remove('selected');
        document.getElementsByClassName('completed')[0].classList.remove('selected');
        document.getElementsByClassName('active')[0].classList.add('selected');
    }

    if (filter == 'completed') {
        document.getElementsByClassName('all')[0].classList.remove('selected');
        document.getElementsByClassName('active')[0].classList.remove('selected');
        document.getElementsByClassName('completed')[0].classList.add('selected');
    }

    for (let i = 0; i < liList.length; i++) {
        let moveItem = liList[i];
        if (filter === 'active') {
            if (moveItem.className === 'completed') {
                moveItem.style.display = 'none';
            }
        }

        if (filter === 'completed') {
            if (moveItem.className !== 'completed') {
                moveItem.style.display = 'none';
            }
        }
    }
}