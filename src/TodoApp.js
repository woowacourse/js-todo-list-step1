import Todos from './Todos.js';
import Todo from './Todo.js';

const app = function Contoller() {
    const newTodoTitle = document.querySelector('#new-todo-title');
    const todoList = document.querySelector('#todo-list');

    const todos = new Todos();

    const updateTodoList = () => {
        console.log(3);
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
        if (event.target && event.target.getAttribute("class") === "toggle") {
            todos.checkById(event.target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    };

    const removeTodoItem = (event) => {
        if (event.target && event.target.getAttribute("class") === "destroy") {
            todos.removeById(event.target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    };

    const selectToEditTodoItem = (event) => {
        if (event.target && event.target.getAttribute("class") === "label") {
            todos.editById(event.target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    }

    const editTodoItem = ({target, key}) => {
        if (target.value) {
            if (key === "Enter") {
                todos.changeTodoItemById(target.closest("li").getAttribute("id"), target.value);
                updateTodoList();
            }
            if (key === "Escape") {
                todos.undoToEditById(target.closest("li").getAttribute("id"));
                updateTodoList();
            }
        }
    }

    newTodoTitle.addEventListener('keyup', addTodoItem);
    todoList.addEventListener('mouseup', checkTodoItem);
    todoList.addEventListener('mouseup', removeTodoItem);
    todoList.addEventListener('dblclick', selectToEditTodoItem);
    todoList.addEventListener('keyup', editTodoItem);
}

window.onload = () => {
    app();
};