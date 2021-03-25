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
                <input class="edit" value="새로운 타이틀">
            </li>`;
}

document.getElementById("todo-list")
    .addEventListener("click", function (e) {
    if (e.target.classList.contains("toggle")) {
        e.target.closest("li").classList.toggle("completed");
        // 체크박스에 checked 추가
    }
    if (e.target.classList.contains("destroy")) {
        e.target.closest("li").remove();
    }
});
