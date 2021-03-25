const todoInput = document.querySelector("#new-todo-title");

todoInput.addEventListener("keyup", addTodoItem);

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

document.getElementById("todo-list")
    .addEventListener("click", function (e) {
        if (e.target.classList.contains("toggle")) {
            e.target.closest("li").classList.toggle("completed");
            const toggleInput = e.target.closest("li").getElementsByClassName("toggle")[0];
            if (toggleInput.hasAttribute("checked")) {
                toggleInput.removeAttribute("checked");
            } else {
                toggleInput.setAttribute("checked", true);
            }
        }
        if (e.target.classList.contains("destroy")) {
            e.target.closest("li").remove();
        }
    });

document.getElementById("todo-list")
    .addEventListener("dblclick", function (e) {
        const originalValue = e.target.innerText;
        e.target.closest("li").classList.toggle("editing");
        const editInput = e.target.closest("li").getElementsByClassName("edit")[0];
        editInput.addEventListener("keyup", function (event){
            const item = event.target.value;
            if (event.key === "Enter" && item !== "") {
                const parent = event.target.parentNode;
                const label = parent.getElementsByClassName("label")[0];
                label.innerText = item;
                parent.classList.remove("editing");
            }
            if (event.key === "Escape") {
                event.target.value = originalValue;
                event.target.parentNode.classList.remove("editing");
            }
        });
    });
