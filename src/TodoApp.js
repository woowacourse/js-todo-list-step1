import Todos from './Todos.js';
import Todo from './Todo.js';

const app = function Contoller() {
    const newTodoTitle = document.querySelector('#new-todo-title');
    const todoList = document.querySelector('#todo-list');

    const todos = new Todos();

    const addTodoItem = ({target, key}) => {
        if (key === "Enter" && target.value) {
            const todo = new Todo(target.value);
            todos.push(todo);
            target.value = "";
            updateTodoList();
        }
    }

    const updateTodoList = () => {
        todoList.innerHTML = todos.html();
    };

    newTodoTitle.addEventListener('keyup', addTodoItem);
}

window.onload = () => {
    app();
};