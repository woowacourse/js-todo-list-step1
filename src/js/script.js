const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleInput.addEventListener("click", onToggleTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    const todoItem = document.createElement("li");
    if (event.key === "Enter" && todoTitle !== "") {
        todoItem.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        todoList.appendChild(todoItem);
        event.target.value = "";
        updateTotalCount(); 
        addRemoveEventOnDestroyBtn(todoItem);
    }
}

function onToggleTodoItem(event) {
    // event.target.closest("li").classList.toggle("completed");
    event.target.closest("ul").insertAdjacentHTML("beforeend", renderTodoItemCompletedTemplate(title));
}  

function renderTodoItemCompletedTemplate(title) {
    return `<li class="completed"> 
                <div class="view">
                <input class="toggle" type="checkbox" checked/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
                </div>
                <input class="edit" value=${title}/>
            </li>`;
}

function renderTodoItemTemplate(title) {
    return `<div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${title}>`;
  }

function updateTotalCount() {
    const todoList = document.getElementById("todo-list").getElementsByTagName("li");
    const todoCount = document.getElementsByClassName("todo-count").item(0);
    todoCount.innerHTML = "총 <strong>" + todoList.length + "</strong> 개";
}

function addRemoveEventOnDestroyBtn(todoItem) {
    const removeBtn = todoItem.getElementsByClassName("destroy").item(0);
    removeBtn.addEventListener('click', function() {
        const todoList = document.getElementById("todo-list");
        todoList.removeChild(todoItem);
        updateTotalCount();
    });
}