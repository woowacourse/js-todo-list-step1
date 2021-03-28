const $todoInput = document.querySelector("#new-todo-title");
const $toggleInput = document.querySelector(`#todo-list`);
const $todoCount = document.querySelector(`span strong`);

$todoInput.addEventListener("keyup", addTodoItem);

document.addEventListener("click", activeTodoItem);
document.addEventListener("click", allTodoItem);
document.addEventListener("click", finishTodoItem);

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

function addTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if ("Enter" === event.key && "" !== todoTitle) {
        todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        count();
    }
}

function onToggleTodoItem(event) {
    const target = event.target;
    if ("toggle" === target.className) {
        if ("completed" === target.closest("li").className) {
            target.closest("li").className = "active";
        } else {
            target.closest("li").className = "completed";
        }
    }
}

function updateTodoItem(event) {
    const target = event.target;
    if ("label" === target.className) {
        target.closest("li").classList.add("editing");

        const editInput = document.querySelector(".edit");
        editInput.addEventListener("keydown", function(event){
            if ("Escape" === event.key) {
                target.closest("li").classList.remove("editing");
            }

            if ("Enter" === event.key) {
                target.innerText = editInput.value;
                target.closest("li").classList.remove("editing");
            }
        })
    }
}

function deleteTodoItem(event) {
    const target = event.target;
    if ("destroy" === target.className) {
        target.closest("li").remove();
    }
}

function activeTodoItem(event) {
    if (event.target.className === 'active') {
        let countItems = 0;
        const todoList = $toggleInput.children;
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].classList.contains("completed")) {
                todoList[i].style.display = "none";
            } else {
                countItems++;
                todoList[i].style.display = "block";
            }
        }
        $todoCount.innerHTML = countItems.toString();
    }
}

function allTodoItem(event) {
    if (event.target.className === 'all selected') {
        const childrens = $toggleInput.children;
        for (let i = 0; i < childrens.length; i++) {
            childrens[i].style.display = "block";
        }
        $todoCount.innerHTML = $toggleInput.children.length.toString();
    }
}

function finishTodoItem(event) {
    if (event.target.className === 'completed') {
        let count = 0;
        const childrens = $toggleInput.children;
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].classList.contains("completed")) {
                count++;
                childrens[i].style.display = "block";
            } else {
                childrens[i].style.display = "none";
            }
        }
        $todoCount.innerHTML = count.toString();
    }
}

function count() {
    $todoCount.innerHTML = $toggleInput.children.length.toString();
}