const todoInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");

function addTodoItem(event) {
    const item = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && item !== "") {
        todoList.insertAdjacentHTML("beforeend", todoItemTemplate(item));
        event.target.value = "";
    }
}

function todoItemTemplate(item) {
    return `<li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label class="label">${item}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${item}" placeholder="새로운 타이틀">
            </li>`;
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
