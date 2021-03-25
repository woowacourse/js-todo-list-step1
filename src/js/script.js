
// todoItem 추가
const todoInput = document.getElementById('new-todo-title');
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('new-todo-title');
        addList(input.value);
        input.value = "";
    }
})



function addList(input) {
    const todoList = document.getElementById('todo-list');
    const temp = document.createElement('li');
    temp.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox" onclick="clickCheckBox(event)"/>
            <label class="label" ondblclick="edit(event)">${input}</label>
            <button class="destroy" onclick="destroy(event)"></button>
        </div>
        <input class="edit" value="${input}" />
    `
    todoList.appendChild(temp);
    const $editInput = temp.getElementsByClassName("edit")[0];
    $editInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const $labelInput = temp.getElementsByClassName("label")[0];
            $labelInput.textContent = $editInput.value;
            e.target.closest("li").classList.remove("editing");
            $editInput.value = $labelInput.textContent;
        }
    })
    updateCount();
}

function clickCheckBox(event) {
    const classList = event.target.parentNode.parentElement.classList;
    if (!classList.contains("active") && !classList.contains("completed")){
        classList.add("active");
    }
    if (classList.contains("active")) {
        event.target.setAttribute("checked", "");
        classList.replace("active", "completed");
        return;
    }
    if (classList.contains("completed")) {
        event.target.removeAttribute("checked");
        classList.replace("completed", "active");
        return;
    }
}

function destroy(event) {
    event.target.parentNode.parentElement.remove();
    updateCount();
}

function edit(event) {
    const classList = event.target.parentNode.parentElement.classList;
    classList.add("editing")

    const input = event.target.parentNode.parentElement;
    input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        classList.remove("editing")
    }
})
}

function updateCount() {
    const count = document.querySelectorAll('.todoapp .todo-list li').length;
    document.getElementById('todo-count-text').innerHTML = count;
}

function allList() {
    const todoItems = document.querySelectorAll('.todoapp .todo-list li');
    todoItems.forEach(element => {
        element.style.display = "block";
    })
}

function onlyToDo() {
    const todoItems = document.querySelectorAll('.todoapp .todo-list li');
    todoItems.forEach(element => {
        if (element.classList.contains("completed")) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    })
}

function completed() {
    const todoItems = document.querySelectorAll('.todoapp .todo-list li');
    todoItems.forEach(element => {
        if (!element.classList.contains("completed")) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    })
}