
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
            <input class="toggle" type="checkbox"/>
            <label class="label">${input}</label>
            <button class="destroy" onclick="destroy(event)"></button>
        </div>
        <input class="edit" value="${input}" />
    `
    todoList.appendChild(temp);
}

function destroy(event) {
    event.target.parentNode.parentElement.remove();
}

