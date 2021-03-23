
// todoItem 추가
const todoInput = document.getElementById('new-todo-title');
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('new-todo-title');
        addList(input.value);
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
}

function clickCheckBox(event) {
    const classList = event.target.parentNode.parentElement.classList;
    if (!classList.contains("false") && !classList.contains("completed")){
        classList.add("false");
    }
    if (classList.contains("false")) {
        event.target.setAttribute("checked", "");
        classList.replace("false", "completed");
        return;
    }
    if (classList.contains("completed")) {
        event.target.removeAttribute("checked");
        classList.replace("completed", "false");
        return;
    }
}

function destroy(event) {
    event.target.parentNode.parentElement.remove();
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

