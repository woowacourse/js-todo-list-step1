// Selector
const todoInput = document.querySelector('#new-todo-title');
const todoList = document.querySelector('#todo-list');

const allTodos = todoList.querySelectorAll('.all');
const activeTodos = todoList.querySelectorAll('.active');
const completedTodos = todoList.querySelectorAll('.completed');

// Values
const EMPTY_STRING = "";

// Event Listeners
todoInput.addEventListener('keypress', addTodo);
todoList.addEventListener('click', checkTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('dblclick', editTodo);

// Functions
function addTodo(event) {
    const newTodoTitle = todoInput.value;
    if (event.key === 'Enter' && newTodoTitle !== EMPTY_STRING) {
        const newTodo = document.createElement('li');
        newTodo.innerHTML = renderTodoItemTemplate(newTodoTitle);
        todoInput.value = '';
        todoList.append(newTodo);
    }
}

function checkTodo(event) {
    const todoCheckBox = event.target.closest('.toggle');
    todoCheckBox.parentNode.parentNode.classList.toggle('completed');
    todoCheckBox.toggleAttribute('checked');
}

function deleteTodo(event) {
    if (event.target.className === 'destroy') {
        event.target.parentNode.parentNode.remove();
    }
}

function editTodo(event) {
    if (event.target.className === 'label') {
        const todoTitle = event.target;
        todoTitle.parentNode.parentNode.classList.add('editing');
        todoTitle.parentNode.parentNode.addEventListener('keydown', (event) => {

            const todoLi = event.target;
            if (todoLi.className === 'edit' && event.key === 'Enter' && todoLi.value !== '') {
                todoTitle.innerHTML = todoLi.value;
                todoLi.parentNode.classList.remove('editing');
            }

            if (todoLi.className === 'edit' && event.key === 'Escape') {
                todoLi.value = todoTitle.innerText;
                todoLi.parentNode.classList.remove('editing');
            }
        })
    }
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

