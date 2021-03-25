const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $all = document.querySelector(".filters > li:nth-child(1) > a");
const $active = document.querySelector(".filters > li:nth-child(2) > a");
const $completed = document.querySelector(".filters > li:nth-child(3) > a");

window.onload = () => {
    $todoInput.addEventListener("keyup", onAddTodoItem);
    $all.addEventListener("click", showAllTodoItem);
    $active.addEventListener("click", showActiveTodoItem);
    $completed.addEventListener("click", showCompletedTodoItem);
}

function showAllTodoItem(event) {
    $all.classList.add("selected");
    $active.classList.remove("selected");
    $completed.classList.remove("selected");

    for (const todo of $todoList.children) {
        show(todo, 'active');
        show(todo, 'completed');
    }
    updateTotalCount();
}

function showActiveTodoItem(event) {
    $all.classList.remove("selected");
    $active.classList.add("selected");
    $completed.classList.remove("selected");

    for (const todo of $todoList.children) {
        show(todo, 'active');
        hide(todo, 'completed');
    }
    updateCount("active");
}

function showCompletedTodoItem(event) {
    $all.classList.remove("selected");
    $active.classList.remove("selected");
    $completed.classList.add("selected");
    
    for (const todo of $todoList.children) {
        hide(todo, 'active');
        show(todo, 'completed');
    }
    updateCount("completed");
}

function show(todo, status) {
    if (todo.classList.contains(status)){
        todo.style.display = 'block';
    }
}

function hide(todo, status) {
    if (todo.classList.contains(status)) {
        todo.style.display = 'none';
    }
}

function updateCount(status) {
    let count = 0;
    for (const todo of $todoList.children) {
        if (todo.className === status) {
            count++;
        }
    }
    const todoCount = document.getElementsByClassName("todo-count").item(0);
    todoCount.innerHTML = renderCountHtml(count);
}

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoItem = document.createElement("li");
    if (event.key === "Enter" && todoTitle !== "") {
        todoItem.classList.add("active");
        todoItem.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        $todoList.appendChild(todoItem);
        event.target.value = "";

        updateTotalCount(); 
        addToggleEventOnInputBtn(todoItem);
        addRemoveEventOnDestroyBtn(todoItem);
        addEditEventOnLabel(todoItem);
    }
}

function addToggleEventOnInputBtn(todoItem) {
    const toggle = todoItem.querySelector(".view > input");
    toggle.addEventListener('click', function(event) {
        onToggleTodoItem(event);
    });
}

function onToggleTodoItem(event) {
    const input = event.target.closest("input");
    input.setAttribute("checked", "");
    event.target.closest("li").classList.remove("active");
    event.target.closest("li").classList.toggle("completed");
}  

function addEditEventOnLabel(todoItem) {
    const label = todoItem.querySelector(".view > label");
    label.addEventListener('dblclick', function(event) {
        const li = todoItem.closest("li");
        li.classList.add("editing");
        onEditTodoItem(label, li);
    });
}

function onEditTodoItem(label, li) {
    const input = $todoList.querySelector(".edit");
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
            li.classList.remove("editing");
        }
        if (event.key === "Enter") {
            li.classList.remove("editing");
            label.innerHTML = input.value;
        }
    });
}

function addRemoveEventOnDestroyBtn(todoItem) {
    const removeBtn = todoItem.getElementsByClassName("destroy").item(0);
    removeBtn.addEventListener('click', function() {
        $todoList.removeChild(todoItem);
        updateTotalCount();
    });
}

function renderTodoItemTemplate(todo) {
    return `<div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${todo}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${todo}>`;
}

function updateTotalCount() {
    const todoList = $todoList.getElementsByTagName("li");
    const todoCount = document.getElementsByClassName("todo-count").item(0);
    todoCount.innerHTML = renderCountHtml(todoList.length);
}

function renderCountHtml(count) {
    return `총 <strong> ${count} </strong> 개`;
}