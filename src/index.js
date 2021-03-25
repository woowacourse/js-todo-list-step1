window.addEventListener('hashchange', function () {
    const filter = location.href.split("#")[1]
    changeFilter(filter);
});

const btnAll = document.getElementsByClassName('all')[0];
const btnActive =     document.getElementsByClassName('active')[0];
const btnCompleted = document.getElementsByClassName('completed')[0];


document.getElementById('new-todo-title').addEventListener('keydown', addTodoItem);

function addTodoItem(e) {
    console.log(e.keyCode);
    if (e.keyCode != 13) {
        return
    }
    const todoList = document.getElementById('todo-list');
    const todoTitle = document.getElementById('new-todo-title');


    const li = document.createElement('li');
    li.addEventListener('dblclick', changeInputMode)

    const div = document.createElement('div');
    div.setAttribute('class', 'view');

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
        todoItem.setAttribute('checked', 'checked');
        return
    }
    todoItem.removeAttribute('checked');
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
     if (e.keyCode === 27 ) {
         let todoItem = e.target.parentElement;
         todoItem.removeAttribute('class');
         todoItem.addEventListener('dblclick', changeInputMode);
         return
     }

     if (e.keyCode === 13) {
         let todoItem = e.target.parentElement;
         const title = todoItem.firstElementChild.getElementsByClassName('label')[0];
         const editTitle = todoItem.getElementsByClassName('edit')[0];
         title.innerHTML = editTitle.value;
         todoItem.removeAttribute('class');
         todoItem.addEventListener('dblclick', changeInputMode);
     }
}

function countMoveItem() {
    console.log('countMoveItem() called');

    const countContainer = document.getElementsByClassName('count-container')[0];
    const todoList = document.getElementById('todo-list');
    const todoListItems = todoList.getElementsByTagName('li');

    let count = 0;
    for (let i = 0; i < todoListItems.length; i++) {
        console.log(todoListItems[i].style.display);
        if (todoListItems[i].style.display === '') {
            count += 1;
        }
    }

    const todoCount = countContainer.getElementsByClassName('todo-count')[0];
    todoCount.innerHTML = '총 <strong>' + count + '</strong> 개';
}

function changeFilter(filter) {
    let todoList = document.getElementById('todo-list');
    const liList = todoList.getElementsByTagName('li');


    for (let i = 0; i < liList.length; i++) {
        let moveItem = liList[i];
        moveItem.style.display = '';
    }

    if (filter === '') {
        btnAll.classList.add('selected');
        btnActive.classList.remove('selected');
        btnCompleted.classList.remove('selected');
        return;
    }

    if (filter === 'active') {
        btnAll.classList.remove('selected');
        btnActive.classList.add('selected');
        btnCompleted.classList.remove('selected');

    }

    if (filter === 'completed') {
        btnAll.classList.remove('selected');
        btnActive.classList.remove('selected');
        btnCompleted.classList.add('selected');
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

    countMoveItem();
}
