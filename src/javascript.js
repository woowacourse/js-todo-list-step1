const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const allTodo = document.querySelector(".all");
const activeTodo = document.querySelector(".active");
const completedTodo = document.querySelector(".completed");

todoInput.addEventListener("keyup", addTodoItem);
todoList.addEventListener("click", changeToComplete);
todoList.addEventListener("dblclick", editTodoItem);
allTodo.addEventListener("click", showAllTodoItems);
activeTodo.addEventListener("click", showActiveItems);
completedTodo.addEventListener("click", showCompletedItems);

function addTodoItem(event) {
    const item = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && item !== "") {
        allTodo.click();
        todoList.insertAdjacentHTML("beforeend", todoItemTemplate(item));
        event.target.value = "";
        updateCount();
    }
}

function todoItemTemplate(item) {

    return `<li style="display: block">
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label class="label">${item}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${item}" placeholder="새로운 타이틀">
            </li>`;
}

function updateCount() {
    let count = 0;
    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        if (todo.style.display === "block") {
            count++;
        }
    }
    document.querySelector(".todo-count").innerHTML = countTodoTemplate(count);
}

function countTodoTemplate(count) {
    return `총<strong>${count}</strong>개`;
}

function changeToComplete(event) {
    const li = event.target.closest("li");
    if (event.target.classList.contains("toggle")) {
        li.classList.toggle("completed");
        if (event.target.hasAttribute("checked")) {
            event.target.removeAttribute("checked");
        } else {
            event.target.setAttribute("checked", "true");
        }
    }
    if (event.target.classList.contains("destroy")) {
        li.remove();
        updateCount();
    }
}

function editTodoItem(event) {
    const li = event.target.closest("li");
    const label = li.getElementsByClassName("label")[0];
    const editInput = li.getElementsByClassName("edit")[0];
    const originalValue = label.innerText;

    li.classList.toggle("editing");

    editInput.addEventListener("keyup", function (event) {
        const item = event.target.value;
        if (event.key === "Enter" && item !== "") {
            label.innerText = item;
            li.classList.remove("editing");
        }
        if (event.key === "Escape") {
            event.target.value = originalValue;
            li.classList.remove("editing");
        }
    });
}

function showAllTodoItems() {
    allTodo.classList.add("selected");
    activeTodo.classList.remove("selected");
    completedTodo.classList.remove("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        todo.style.display = "block";
    }
    updateCount();
}

function showActiveItems() {
    allTodo.classList.remove("selected");
    activeTodo.classList.add("selected");
    completedTodo.classList.remove("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "none";
        } else {
            todo.style.display = "block";
        }
    }
    updateCount();
}

function showCompletedItems() {
    allTodo.classList.remove("selected");
    activeTodo.classList.remove("selected");
    completedTodo.classList.add("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    }
    updateCount();
}