const $todoInput = document.querySelector("#new-todo-title");
const $filter = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$filter.addEventListener("click", filterTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        updateCount(".view");
    }
}

function renderTodoItemTemplate(title) {
    return ` <li class="active">
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
        if (target.closest("li").className === "completed") {
            target.closest("li").className = "active";
        } else {
            target.closest("li").className = "completed";
        }
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
        if (confirm("정말로 삭제하시겠습니까?")) {
            target.closest("li").remove();
            updateCount(".view");
        }
    }
}

function updateCount(state) {
    const count = document.querySelector("#todo-list").querySelectorAll(state).length;
    document.querySelector(".todo-count strong").innerText = count.toString();
}

function filterTodoItem(event) {
    const target = event.target;
    const items = document.querySelectorAll(".todo-list li");

    if (target.className === "active") {
        showActiveTodo(items);
        return;
    }
    if (target.className === "completed") {
        showCompletedTodo(items);
        return;
    }
    showAllTodo(items);
}

function showActiveTodo(items) {
    updateCount(".active");
    items.forEach(item => {
        if (item.classList.contains("completed")) {
            item.style.display = "none";
        } else  {
            item.style.display = "block";
        }
    })
}

function showCompletedTodo(items) {
    updateCount(".completed");
    items.forEach(item => {
        if (item.classList.contains("completed")) {
            item.style.display = "block";
        } else  {
            item.style.display = "none";
        }
    })
}

function showAllTodo(items) {
    updateCount(".view");
    items.forEach(item => {
        item.style.display = "block";
    })
}