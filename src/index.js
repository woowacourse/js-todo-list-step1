const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        updateCount();
    }
}

function renderTodoItemTemplate(title) {
    return ` <li class="todo-item">
                  <div class="view">
                      <input class="toggle" onclick="onToggleTodoItem(event)" type="checkbox" >
                      <label class="label" ondblclick="updateTodoItem(event)">${title}</label>
                      <button class="destroy" onclick="deleteTodoItem(event)"></button>
                  </div>
                  <input class="edit" value=${title} />
              </li>`;
}

function onToggleTodoItem(event) {
    const target = event.target;
    if (target.className === "toggle") {
        target.closest("li").classList.toggle("completed");
    }
}

function updateTodoItem(event) {
    const target = event.target;
    if (target.className === "label") {
        target.closest("li").classList.add("editing");

        const editInput = document.querySelector(".edit");
        editInput.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                target.closest("li").classList.remove("editing");
            }
            if (event.key === "Enter") {
                target.innerText = editInput.value;
                target.closest("li").classList.remove("editing");
            }
        })
    }
}

function deleteTodoItem(event) {
    const target = event.target;
    if (target.className === "destroy") {
        const choice = confirm("정말로 삭제하시겠습니까?");
        if (choice === true) {
            target.closest("li").remove();
            updateCount();
        }
    }
}

function updateCount() {
    const count = document.querySelectorAll(".todo-item").length;
    document.querySelector(".todo-count strong").innerText = count.toString();
}