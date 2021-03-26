document.getElementById('new-todo-title').addEventListener('keyup',addList)
document.getElementsByClassName('completed')[0].addEventListener('click', completeTodoList);
document.getElementsByClassName('active')[0].addEventListener('click', activeTodoList);
document.getElementsByClassName('all')[0].addEventListener('click', allSelectedTodoList);

function updateCount(count) {
    document.querySelector(".todo-count").innerHTML = "총 " + `<strong>${count}</strong>` + " 개";
}

function allSelectedTodoList() {
    const todoList = document.getElementById('todo-list');
    const childList = todoList.getElementsByTagName('li');

    for (let i = 0; i < childList.length; i++) {
        if (childList[i].classList.contains('completed')) {
            childList[i].style.display = 'block';
        }
        if (childList[i].classList.contains('false')) {
            childList[i].style.display = 'block';
        }
    }

    document.querySelector(".selected").classList.remove("selected");
    document.querySelector(".all").classList.add("selected");
    updateCount(document.getElementById("todo-list").childNodes.length);
}

function activeTodoList() {
    const todoList = document.getElementById('todo-list');
    const childList = todoList.getElementsByTagName('li');

    let count = 0;
    for (let i = 0 ; i< childList.length; i++) {
        if(childList[i].classList.contains('completed')){
            childList[i].style.display = 'none';
        }
        if(childList[i].classList.contains('false')) {
            childList[i].style.display = 'block';
            count++;
        }
    }
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector(".active").classList.add("selected");

    updateCount(count);
}

function completeTodoList() {
    const todoList = document.getElementById('todo-list');
    const childList = todoList.getElementsByTagName('li');

    let count = 0;

    for (let i = 0 ; i< childList.length; i++) {
        if(childList[i].classList.contains('false')){
            childList[i].style.display = 'none';
        }
        if(childList[i].classList.contains('completed')) {
            childList[i].style.display = 'block';
            count++;
        }
    }

    document.querySelector(".selected").classList.remove("selected");
    document.querySelector("a.completed").classList.add("selected");

    updateCount(count);
}

function completeTodo(e) {
    if(e.target.checked){
        e.target.parentElement.parentElement.className = 'completed'
        return
    }
    e.target.parentElement.parentElement.removeAttribute('class');
}

function deletedSelected(e) {
    e.target.parentElement.parentElement.remove();
    let sample = document.querySelector(".todo-list").querySelectorAll("li");
    let count = sample.length;

    if(document.querySelector(".selected").className.startsWith('active')){
        count -= document.querySelector(".todo-list").querySelectorAll("li.completed").length;
    }
    if(document.querySelector(".selected").className.startsWith('completed')) {
        count -= document.querySelector(".todo-list").querySelectorAll("li.false").length;
    }

    updateCount(count);
}

function changeName(e) {
    e.target.parentNode.parentNode.classList.add("editing");
    e.target.parentNode.parentNode.querySelectorAll('input')[1].value = e.target.innerHTML

    e.target.parentNode.value = e.target.innerHTML

    e.target.parentNode.parentElement.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            e.target.parentNode.parentNode.classList.remove("editing");
            return;
        }
        if (event.key === 'Enter') {
            e.target.innerHTML = e.target.parentNode.parentElement.querySelector(".edit").value;
            e.target.parentNode.parentNode.classList.remove("editing");
            return;
        }
    })
}


function addList(e) {
    if(e.key === 'Escape') {
        document.getElementById('new-todo-title').value = "";
        return;
    }

    if(e.key !== 'Enter') {
        return;
    }
    const contents = document.getElementById('todo-list');


    const li = document.createElement('li');
    const div = document.createElement('div');
    div.setAttribute('class','view');
    li.classList.add("false");

    const toggle = document.createElement('input');
    toggle.setAttribute('class', 'toggle');
    toggle.setAttribute('type', 'checkbox');
    toggle.addEventListener('click', completeTodo);
    div.appendChild(toggle);

    const label = document.createElement('label');
    label.setAttribute("class", "label");
    if( document.getElementById('new-todo-title').value === "") {
        return;
    }
    label.innerHTML = document.getElementById('new-todo-title').value;
    label.addEventListener('dblclick',changeName);

    div.appendChild(label);

    const button = document.createElement('button');
    button.setAttribute('class', 'destroy');
    button.addEventListener('click', deletedSelected);
    div.appendChild(button);
    li.appendChild(div);

    const input = document.createElement('input');
    input.setAttribute('class', 'edit');
    input.setAttribute('value', "")
    li.appendChild(input);

    contents.appendChild(li);
    document.getElementById('new-todo-title').value = "";

    updateCount(document.getElementById("todo-list").childNodes.length)
}
