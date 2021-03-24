document.getElementById("new-todo-title").addEventListener('change', addToDoList);

function addToDoList() {
    let ul = document.getElementById("todo-list");
    let value = document.getElementById("new-todo-title").value;
    ul.innerHTML = `<li>
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${value}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${value}"/>
    </li>`;
}