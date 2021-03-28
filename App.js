import AddTodo from "./AddTodo.js";

const $count = document.querySelector('strong');
const $newTodo = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('#todo-list');

const renderTodoTemplate = function(item) {
    return ` <li id = ${item.id} class = ${item.completed && 'completed'} >
                <div class="view">
                    <input class="toggle" type="checkbox"
                        id=${item.id} ${item.completed && 'checked'} />
                    <label class="label">${item.title}</label>
                    <button class="destroy" id=${item.id}></button>
                </div>
                <input class="edit" value="${item.title}">
            </li>`;
}

const updateTodoCount = function() {
    $count.innerHTML = $todoList.childElementCount;
}

const renderTodo = function() {
    const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
    $todoList.innerHTML = '';
    
    for (let i = 0; i < todos.length; i++) {
        $todoList.insertAdjacentHTML("beforeend", renderTodoTemplate(todos[i]));
    }

    updateTodoCount();
}

renderTodo();

AddTodo.prototype.renderTodo = renderTodo;
const addTodo = new AddTodo($newTodo);
