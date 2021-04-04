// Selector
const todoInput = document.querySelector('#new-todo-title');
const todoList = document.querySelector('#todo-list');

const allTodos = document.querySelector('.all');
const activeTodos = document.querySelector('.active');
const completedTodos = document.querySelector('.completed');

const selectedCount = document.querySelector(".todo-count strong");

const EMPTY_STRING = "";

todoInput.addEventListener('keypress', addTodo);
todoList.addEventListener('click', checkTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('dblclick', editTodo);

allTodos.addEventListener("click", showAll);
activeTodos.addEventListener("click", showActives);
completedTodos.addEventListener("click", showCompleted);

function addTodo(event) {
    const newTodoTitle = todoInput.value;
    if (event.key === 'Enter' && newTodoTitle !== EMPTY_STRING) {
        const newTodo = document.createElement('li');
        newTodo.innerHTML = renderTodoItemTemplate(newTodoTitle);
        todoInput.value = '';
        todoList.append(newTodo);
        showAll();
    }
    updateCount();
}

function checkTodo(event) {
    if (event.target.className === 'toggle') {
        event.target.parentNode.parentNode.classList.toggle('completed');
        event.target.toggleAttribute('checked');
    }
}

function deleteTodo(event) {
    if (event.target.className === 'destroy') {
        event.target.parentNode.parentNode.remove();
    }
    updateCount();
}

function editTodo(event) {
    if (event.target.className === 'label') {
        const todoTitle = event.target;
        todoTitle.parentNode.parentNode.classList.add('editing');
        todoTitle.parentNode.parentNode.addEventListener('keydown', (event) => {

            const todoLi = event.target;
            if (todoLi.className === 'edit' && event.key === 'Enter' && todoLi.value !== '') {
                todoTitle.innerHTML = todoLi.value;
                todoLi.parentNode.classList.remove('editing');
            }

            if (todoLi.className === 'edit' && event.key === 'Escape') {
                todoLi.value = todoTitle.innerText;
                todoLi.parentNode.classList.remove('editing');
            }
        })
    }
}

function showAll() {
    allTodos.classList.add("selected");
    activeTodos.classList.remove("selected");
    completedTodos.classList.remove("selected");

    for (const todo of todoList.children) {
        todo.style.display = "block";
    }
    updateCount();
}

function showActives() {
    allTodos.classList.remove("selected");
    activeTodos.classList.add("selected");
    completedTodos.classList.remove("selected");

    for (const todo of todoList.children) {
        if (!todo.classList.contains("completed")) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    }
    updateCount();
}

function showCompleted() {
    allTodos.classList.remove("selected");
    activeTodos.classList.remove("selected");
    completedTodos.classList.add("selected");

    for (const todo of todoList.children) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    }
    updateCount();
}

function renderTodoItemTemplate(title) {
    return `
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${title} />
        `;
}

function updateCount() {
    const selectedTodo = document.querySelector(".show");
}

