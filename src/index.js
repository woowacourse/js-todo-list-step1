const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector(".todo-list");


$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onDeleteTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener('dblclick', onEditTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
    onTodoCount();
}

function renderTodoItemTemplate(title) {
    return `<li class="all">
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${title}</label>
                    <button class="destroy" ></button>
                </div>
                <input class="edit" value="${title}" />
            </li>`;
}

function onDeleteTodoItem(event) {
    if (event.target.className === "destroy") {
        event.target.closest('li').remove();
    }
    onTodoCount();
}

function onToggleTodoItem(event) {
    if (event.target.className === "toggle") {
        event.target.closest("li").classList.toggle("completed");
    }
}

function onEditTodoItem(event) {
    if(event.target.className === "label"){
        const originalTodo = event.target.closest('li')
        const editInput = originalTodo.querySelector('.edit')
        originalTodo.classList.toggle('editing');

        editInput.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                event.target.textContent = editInput.value;
                originalTodo.classList.remove("editing");
            }
            if (e.key === "Escape") {
                editInput.value = event.target.textContent;
                originalTodo.classList.remove("editing");
            }
        })
    }
    onTodoCount();
}

function onTodoCount() {
    const strongTag = document.getElementsByClassName("count")[0];
    strongTag.innerHTML = $todoList.childElementCount;
}