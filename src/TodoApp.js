const app = function Contoller() {
    const newTodoTitle = document.querySelector('#new-todo-title')
    const todoList = document.querySelector('#todo-list')

    const todos = [];

    const addTodoItem = ({target, key}) => {
        if (key === "Enter" && target.value) {
            const todo = new Object()
            todo.title = target.value
            todos.push(todo)
            target.value = ""
            updateTodoList()
        }
    }

    const todoTemplate = (todo) => {
        return `<li>
            <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">${todo.title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}" />
        </li>`;
    }

    const updateTodoList = () => {
        todoList.innerHTML = ""

        todos.forEach(todo => {
            todoList.insertAdjacentHTML('beforeend', todoTemplate(todo))
        });
    }

    newTodoTitle.addEventListener('keyup', addTodoItem)
    
}

app();