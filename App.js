import AddTodo from "./AddTodo.js";
import ChangeTodo from "./ChangeTodo.js";
import EditTodo from "./EditTodo.js";
import Filters from "./Filters.js";

const $count = document.querySelector('strong');
const $newTodo = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('#todo-list');
const $filters = document.querySelector('.filters');

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

const renderTodo = function(type) {
    const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
    $todoList.innerHTML = '';

    type = type || 'ALL';

    if (type === 'ALL') {
        for (let i = 0; i < todos.length; i++) {
            $todoList.insertAdjacentHTML("beforeend", renderTodoTemplate(todos[i]));
        }
    }
    if (type === 'active') {
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].completed) {
                $todoList.insertAdjacentHTML("beforeend", renderTodoTemplate(todos[i]));
            }
        }
    }
    if (type === 'completed') {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed) {
                $todoList.insertAdjacentHTML("beforeend", renderTodoTemplate(todos[i]));
            }
        }
    }
    
    updateTodoCount();
}

renderTodo();

AddTodo.prototype.renderTodo = renderTodo;
new AddTodo($newTodo);

ChangeTodo.prototype.renderTodo = renderTodo;
new ChangeTodo($todoList);

EditTodo.prototype.renderTodo = renderTodo;
new EditTodo($todoList);

Filters.prototype.renderTodo = renderTodo;
new Filters($filters);