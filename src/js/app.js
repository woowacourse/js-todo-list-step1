const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(`#todo-list`);
const $todoCount = document.querySelector(`span strong`);

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleInput.addEventListener("click", onToggleTodoItem);
$toggleInput.addEventListener("dblclick", editingTodoItem);

document.addEventListener("click", activeTodoItem);
document.addEventListener("click", allTodoItem);
document.addEventListener("click", finishTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");

    if (event.key === "Enter" && todoTitle !== "") {
        todoList.innerHTML += renderTodoItemTemplate(todoTitle);
        event.target.value = "";
        count();
    }
}

function onToggleTodoItem(event) {
    if (event.target.classList.contains("toggle")) {
        event.target.closest("li").classList.toggle("completed");
    }

    if (event.target.classList.contains("destroy")) {
        let todoList = document.getElementById("todo-list");
        todoList.removeChild(event.target.parentElement.parentElement);
    }
}

function editingTodoItem(event) {
    console.log("gㅁasdfasdfadsfk");

    if (event.target.classList.contains("editing")) {
        console.log("gk");
    }
}

function renderTodoItemTemplate(title) {
    return `<li class="false">
    <div class="editing">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`;
}

function activeTodoItem(event) {
    if (event.target.className === 'active') {
        let countItems = 0;
        const todoList = $toggleInput.children;
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].classList.contains("completed")) {
                todoList[i].style.display = "none";
            } else {
                countItems++;
                todoList[i].style.display = "block";
            }
        }
        $todoCount.innerHTML = countItems.toString();
    }
}

function allTodoItem(event) {
    if (event.target.className === 'all selected') {
        const childrens = $toggleInput.children;
        for (let i = 0; i < childrens.length; i++) {
            childrens[i].style.display = "block";
        }
        $todoCount.innerHTML = $toggleInput.children.length.toString();
    }
}

function finishTodoItem(event) {
    if (event.target.className === 'completed') {
        let count = 0;
        const childrens = $toggleInput.children;
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].classList.contains("completed")) {
                count++;
                childrens[i].style.display = "block";
            } else {
                childrens[i].style.display = "none";
            }
        }
        $todoCount.innerHTML = count.toString();
    }
}

function count() {
    $todoCount.innerHTML = $toggleInput.children.length.toString();
}