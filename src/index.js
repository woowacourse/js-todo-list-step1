const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector(".todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onDeleteTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function renderTodoItemTemplate(title) {
    return `<li>
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${title}</label>
                    <button class="destroy" ></button>
                </div>
                <input class="edit" value="새로운 타이틀" />
            </li>`;

}

function onDeleteTodoItem(event) {
    if (event.target.className === "destroy") {
        event.target.closest('li').remove();
    }
}

function onToggleTodoItem(event) {
    if (event.target.className === "toggle") {
        event.target.closest("li").classList.toggle("completed");

    }
}