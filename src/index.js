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
    var count = $todoList.childElementCount
    onTodoCount(count);
}

function renderTodoItemTemplate(title) {
    return `<li>
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
    var count = $todoList.childElementCount
    onTodoCount(count);
}

function onToggleTodoItem(event) {
    if (event.target.className === "toggle") {
        event.target.closest("li").classList.toggle("completed");
        event.target.toggleAttribute(`checked`);
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
}

function onTodoCount(value) {
    const strongTag = document.getElementsByClassName("count")[0];
    strongTag.innerHTML  = value;
}

const $filtered = document.querySelector(".filters");

const $allTodo = document.querySelector(".all");
const $activeTodo = $filtered.querySelector(".active");
const $completedTodo = $filtered.querySelector(".completed");

$allTodo.addEventListener("click", onFilterAllTodo);
$activeTodo.addEventListener("click", onFilterActiveTodo);
$completedTodo.addEventListener("click", onFilterCompletedTodo);

function resetFilter() {
    document.querySelector(".all").classList.remove("selected");
    $filtered.querySelector(".active").classList.remove("selected");
    $filtered.querySelector(".completed").classList.remove("selected");
}

function onFilterAllTodo() {
    resetFilter();
    document.querySelector(".all").classList.add("selected");

    for (const todoItem of $todoList.children) {
        todoItem.style.display = "block";
    }

    var count = $todoList.childElementCount
    onTodoCount(count);
}

function onFilterActiveTodo() {
    resetFilter();
    $filtered.querySelector(".active").classList.add("selected");

    var count = 0;

    for (const todoItem of $todoList.children) {
        if (!todoItem.classList.contains("completed")) {
            todoItem.style.display = "block";
            count += 1;
        } else {
            todoItem.style.display = "none";
        }
    }

    onTodoCount(count);
}

function onFilterCompletedTodo() {
    resetFilter()
    $filtered.querySelector(".completed").classList.add("selected");

    var count = 0;

    for (const todoItem of $todoList.children) {
        if (todoItem.classList.contains("completed")) {
            todoItem.style.display = "block";
            count += 1;
        } else {
            todoItem.style.display = "none";
        }
    }

    onTodoCount(count);
}
