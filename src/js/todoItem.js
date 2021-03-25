const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const allTodo = document.querySelector(".all");
const willTodo = document.querySelector(".active");
const finishTodo = document.querySelector(".completed");

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
    document.querySelector(".todo-count").innerHTML = countTemplate(count);
}

function countTemplate(count) {
    return `총<strong>${count}</strong>개`;
}

todoInput.addEventListener("keyup", addTodoItem);

todoList.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (event.target.classList.contains("toggle")) {
        li.classList.toggle("completed");
        if (event.target.hasAttribute("checked")) {
            event.target.removeAttribute("checked");
        } else {
            event.target.setAttribute("checked", true);
        }
    }
    if (event.target.classList.contains("destroy")) {
        li.remove();
        updateCount();
    }
});

todoList.addEventListener("dblclick", function (event) {
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
});

allTodo.addEventListener("click", function () {
    allTodo.classList.add("selected");
    willTodo.classList.remove("selected");
    finishTodo.classList.remove("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        todo.style.display = "block";
    }
    updateCount();
});

willTodo.addEventListener("click", function () {
    allTodo.classList.remove("selected");
    willTodo.classList.add("selected");
    finishTodo.classList.remove("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "none";
        } else {
            todo.style.display = "block";
        }
    }
    updateCount();
});

finishTodo.addEventListener("click", function () {
    allTodo.classList.remove("selected");
    willTodo.classList.add("selected");
    finishTodo.classList.remove("selected");

    const allTodoList = todoList.childNodes;
    for (let todo of allTodoList) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    }
    updateCount();
});
