import Todos from './Todos.js';
import Todo from './Todo.js';

const app = function Contoller() {
    const newTodoTitle = document.querySelector('#new-todo-title');
    const todoList = document.querySelector('#todo-list');

    const todos = new Todos();

    const updateTodoList = () => {
        todoList.innerHTML = todos.html();
    }

    const addTodoItem = ({target, key}) => {
        if (key === "Enter" && target.value) {
            const todo = new Todo(target.value);
            todos.push(todo);
            target.value = "";
            updateTodoList();
        }
    }

    const checkTodoItem = (event) => {
        if (event.target && event.target.nodeName == "INPUT") {
            todos.checkById(event.target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    };

    const removeTodoItem = (event) => {
        if (event.target && event.target.nodeName == "BUTTON") {
            todos.removeById(event.target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    };

    newTodoTitle.addEventListener('keyup', addTodoItem);
    todoList.addEventListener('mouseup', checkTodoItem);
    todoList.addEventListener('mouseup', removeTodoItem);
}

window.onload = () => {
    app();
};