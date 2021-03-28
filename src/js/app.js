// Selector
const todoInput = document.querySelector("#new-todo-title");
const todoList = document.querySelector("#todo-list");

const allTodos = todoList.querySelectorAll(".all");
const activeTodos = todoList.querySelectorAll(".active");
const completedTodos = todoList.querySelectorAll(".completed");

// Values
const EMPTY_STRING = "";

// Event Listeners
todoInput.addEventListener('keypress', addTodo);
todoList.addEventListener("click", checkTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("dblclick", editTodo);

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
    const todo = event.target.closest("li");
    todo.classList.toggle("completed");
    todo.querySelector(".toggle").toggleAttribute("checked");
}

function deleteTodo(event) {
    if (event.target.className === "destroy") {
        event.target.parentNode.parentNode.remove();
    }
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
