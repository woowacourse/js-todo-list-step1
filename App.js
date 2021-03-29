import AddTodo from "./AddTodo.js";
import ChangeTodo from "./ChangeTodo.js";
import EditTodo from "./EditTodo.js";
import Filters from "./Filters.js";

export default function App() {
    this.$count = document.querySelector('strong');
    this.$newTodo = document.querySelector('#new-todo-title');
    this.$todoList = document.querySelector('#todo-list');
    this.$filters = document.querySelector('.filters');

    this.renderTodoTemplate = function(item) {
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
    
    this.updateTodoCount = function() {
        this.$count.innerHTML = this.$todoList.childElementCount;
    }.bind(this);

    this.renderTodo = function(type) {
        const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
        this.$todoList.innerHTML = '';
    
        type = type || 'ALL';
    
        if (type === 'ALL') {
            for (let i = 0; i < todos.length; i++) {
                this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
            }
        }
        if (type === 'active') {
            for (let i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
                }
            }
        }
        if (type === 'completed') {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    this.$todoList.insertAdjacentHTML("beforeend", this.renderTodoTemplate(todos[i]));
                }
            }
        }
        
        this.updateTodoCount();
    }.bind(this);

    this.addTodo = new AddTodo(this.$newTodo, this.renderTodo);
    this.changeTodo = new ChangeTodo(this.$todoList, this.renderTodo);
    this.editTodo = new EditTodo(this.$todoList, this.renderTodo);
    this.filters = new Filters(this.$filters, this.renderTodo);
}

window.onload = function() {
    const app = new App();
    app.renderTodo();
}
