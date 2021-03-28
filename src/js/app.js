// Selector
const todoInput = document.querySelector("#new-todo-title");
const todoList = document.querySelector("#todo-list");
const countContainer = todoList.querySelector(".count-container");

const showCompletedButton = todoList.querySelector(".completed");

const allTodos = todoList.querySelectorAll(".all");
const activeTodos = todoList.querySelectorAll(".active");
const completedTodos = todoList.querySelectorAll(".completed");

// Values
const EMPTY_STRING = "";

// Event Listeners
todoInput.addEventListener('keypress', addTodo);

showCompletedButton.addEventListener('click', showCompleted);

// Functions
function addTodo(event) {
    const newTodoTitle = todoInput.value;
    if (event.key === 'Enter' && newTodoTitle !== EMPTY_STRING) {
        const newTodo = document.createElement("li");
        newTodo.innerHTML = renderTodoItemTemplate(newTodoTitle);
        todoInput.value = "";
        todoList.append(newTodo);
    }
}

function checkTodo(event) {

}

function deleteTodo(event) {

}

function editTodo(event) {

}

function showCompleted() {

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
