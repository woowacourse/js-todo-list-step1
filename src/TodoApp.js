import Todos from './Todos.js';
import Todo from './Todo.js';

const app = function Contoller() {

    const todoTemplate = (todo) => {
        return `<li id=${todo.id} class ="${todo.isChecked ? `completed` : ``} ${todo.isEditing ? `editing` : ``}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.isChecked ? `checked` : ``}/>
                <label class="label">${todo.title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}" />
        </li>`;
    };

    const newTodoTitle = document.querySelector('#new-todo-title');
    const todoList = document.querySelector('#todo-list');
    const todoCount = document.querySelector('.todo-count');
    const filters = document.querySelector('.filters');

    let filter = "all";

    const todos = new Todos();

    const newTodoList = (todoItems) => {
        var result = "";
        
        todoItems.forEach(todo =>
            result += todoTemplate(todo)
        );

        return result;
    };

    const updateTodoList = () => {
    
        let filteredTodoItems;
        if (filter === "active") {
            filteredTodoItems = todos.activeTodos();
        } else if (filter === "completed") {
            filteredTodoItems = todos.completedTodos();
        } else {
            filteredTodoItems = todos.allTodos();
        }

        todoList.innerHTML = newTodoList(filteredTodoItems);
        todoCount.innerHTML = "총 <strong>" + filteredTodoItems.length + "</strong> 개";
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

    const filterTodoItems = (event) => {
        if (event.target && event.target.tagName === "A") {
            filter = event.target.getAttribute("class");
            event.target.closest('ul').querySelectorAll('a').forEach(target => target.classList.remove('selected'));
            event.target.classList.add('selected');
            updateTodoList();
        }
    }

    newTodoTitle.addEventListener('keyup', addTodoItem);
    todoList.addEventListener('mouseup', checkTodoItem);
    todoList.addEventListener('mouseup', removeTodoItem);
    todoList.addEventListener('dblclick', selectToEditTodoItem);
    todoList.addEventListener('keyup', editTodoItem);
    filters.addEventListener('mouseup', filterTodoItems);
}

window.onload = () => {
    app();
};