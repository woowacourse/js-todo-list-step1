// Selector
const todoInput = document.querySelector("#new-todo-title");
const todoList = document.querySelector("#todo-list");

// Values
const EMPTY_STRING = "";

// Event Listeners
todoInput.addEventListener('keypress', addTodo);

// Functions
function addTodo(event) {
    const newTodoTitle = todoInput.value;
    if (event.key === 'Enter' && newTodoTitle !== EMPTY_STRING) {
        const newTodo = document.createElement("li");
        newTodo.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${newTodoTitle}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${newTodoTitle} />
        `;

        todoInput.value = "";
        todoList.append(newTodo);
    }
}

function deleteTodo(event) {

}

function editTodo(event) {

}

function completeTodo(event) {

}
