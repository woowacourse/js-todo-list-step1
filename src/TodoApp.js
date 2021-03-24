import Todos from './Todos.js';
import Todo from './Todo.js';
import {allFilters, Filter} from './Filter.js';

const app = function Contoller() {

    const todos = new Todos();
    const currnetFilter = new Filter();

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

    const filterTemplate = (filter) => {
        console.log(currnetFilter);
        return `<li>
            <a id=${filter} href="#${filter}" ${currnetFilter.name === filter ? `class = selected` : ``}> ${allFilters[filter]} </a>
        </li>`
    }

    const newTodoTitle = document.querySelector('#new-todo-title');
    const todoList = document.querySelector('#todo-list');
    const todoCount = document.querySelector('.todo-count');
    const filters = document.querySelector('.filters');

    let filter = "all";

    const newTodoList = (todoItems) => {
        var result = "";
        
        todoItems.forEach(todo =>
            result += todoTemplate(todo)
        );

        return result;
    };

    const updateTodoList = () => {
    
        let filteredTodoItems;
        if (currnetFilter.name === "active") {
            filteredTodoItems = todos.activeTodos();
        } else if (currnetFilter.name === "completed") {
            filteredTodoItems = todos.completedTodos();
        } else {
            filteredTodoItems = todos.allTodos();
        }

        todoList.innerHTML = newTodoList(filteredTodoItems);
        todoCount.innerHTML = "총 <strong>" + filteredTodoItems.length + "</strong> 개";
    };

    const newFilters = () => {
        var result = "";

        console.log(allFilters)
        Object.keys(allFilters).forEach(filter =>
            result += filterTemplate(filter)
        );
        return result;
    };

    const updateFilters = () => {
        filters.innerHTML = newFilters();
    };

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
        if (target.value && key === "Enter") {
            todos.changeTodoItemById(target.closest("li").getAttribute("id"), target.value);
            updateTodoList();
        }
        if (key === "Escape") {
            todos.undoToEditById(target.closest("li").getAttribute("id"));
            updateTodoList();
        }
    }

    const filterTodoItems = (event) => {
        if (event.target && event.target.tagName === "A") {
            currnetFilter.chageFilter(event.target.getAttribute("id"));
            updateFilters();
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