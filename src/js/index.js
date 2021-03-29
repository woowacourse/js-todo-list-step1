var todoPage;

document.addEventListener("DOMContentLoaded", function () {
    todoPage = new TodoPage();
    todoPage.initTodoPage();
});

function TodoPage() {
}

TodoPage.prototype.initTodoPage = function () {
    this.registerTodoAddEvent();
    this.registerTodoToggleEvent();
    this.registerTodoDeleteEvent();
    this.registerTodoFilterEvent();
    this.registerUpdateTodoEvent();
}

TodoPage.prototype.registerTodoAddEvent = function () {
    document.querySelector("#new-todo-title").addEventListener("keyup", function (event) {
        const todo = event.target.value;
        if (event.key === "Enter" && todo !== "") {
            document.getElementById("todo-list").insertAdjacentHTML("beforeend", todoPage.todoItem(todo));
            event.target.value = "";
            document.querySelector('.all').click();
        }
    });
}

TodoPage.prototype.registerTodoToggleEvent = function (event) {
    document.querySelector('.todo-list').addEventListener('click', function (event) {
        if (event.target.className === "toggle") {
            var todoItem = event.target.parentNode.parentNode;
            if (todoItem.className === "completed") {
                todoItem.className = "active";
                return;
            }
            todoItem.classList = "completed";
        }
    }, { capture: true });
}

TodoPage.prototype.registerTodoDeleteEvent = function () {
    document.querySelector('.todo-list').addEventListener('click', function (event) {
        if (event.target.className === "destroy") {
            var todoItem = event.target.parentNode.parentNode;
            todoItem.remove();
            todoPage.updateTodoCounts();
        }
    }, { capture: true });
}


TodoPage.prototype.registerTodoFilterEvent = function () {
    document.querySelector('.filters').addEventListener('click', function (event) {

        document.querySelectorAll('.filters li a').forEach(item => { item.classList.remove("selected") });
        var element = event.target;
        if (element.className === "all") {
            todoPage.displayAllTodos();
        }
        else if (element.className === "active") {
            todoPage.displayActiveTodos();
        }
        else if (element.className === "completed") {
            todoPage.displayCompletedTodos();
        }
        element.classList.toggle("selected");
    }, { capture: true });
}

TodoPage.prototype.displayAllTodos = function () {
    document.querySelectorAll(".todo-list li").forEach(item => {
        item.style.display = "block";
    })

    todoPage.updateTodoCounts();
}

TodoPage.prototype.displayActiveTodos = function () {
    document.querySelectorAll(".todo-list li").forEach(item => {
        if (item.className === "completed") {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    })
    todoPage.updateTodoCounts();
}

TodoPage.prototype.displayCompletedTodos = function () {
    document.querySelectorAll(".todo-list li").forEach(item => {
        if (item.className === "active") {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    })
    todoPage.updateTodoCounts();
}

TodoPage.prototype.todoItem = function (title) {
    return ` <li class="active">
                  <div class="view">
                      <input class="toggle" type="checkbox" >
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value=${title} />
              </li>`;
}

TodoPage.prototype.updateTodoCounts = function () {
    var todoItems = document.querySelector("#todo-list").querySelectorAll('li');
    var todoItemCounts = 0;

    todoItems.forEach(todoItem => {
        if (todoItem.style.display !== "none")
            todoItemCounts++;
    })

    document.querySelector(".todo-count strong").innerText = todoItemCounts.toString();
}

TodoPage.prototype.registerUpdateTodoEvent = function () {
    document.querySelector('.todo-list').addEventListener('click', function (event) {
        const target = event.target;
        if (target.className === "label") {
            target.closest("li").classList.add("editing");
            const editInput = target.parentElement.parentElement.querySelector('.edit');
            editInput.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    target.closest("li").classList.remove("editing");
                }
                if (event.key === "Enter") {
                    target.innerText = editInput.value;
                    target.closest("li").classList.remove("editing");
                }
            })
        }
    }, { capture: true });
}
