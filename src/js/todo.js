addEventListenerAddingTodos();
addEventListenerShowCompleted();
addEventListenerShowActive();
addEventListenerShowAll();

function addEventListenerAddingTodos() {
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let todoItem = document.getElementById("new-todo-title").value;
            if (todoItem !== '') {
                addTodo(todoItem);
            }
            document.getElementById("new-todo-title").value = '';
        }
    })
}

function addEventListenerShowAll() {
    document.querySelector("a[href='#']").addEventListener('click', function () {
        let todos = document.querySelector(".todo-list").querySelectorAll("li");
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains("completed")) {
                todos[i].style.display = null;
            }
            if (todos[i].classList.contains("false")) {
                todos[i].style.display = null;
            }
        }
    })
}

function addEventListenerShowActive() {
    document.querySelector("a[href='#active']").addEventListener('click', function () {
        let todos = document.querySelector(".todo-list").querySelectorAll("li");
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains("completed")) {
                todos[i].style.display = "none";
            }
            if (todos[i].classList.contains("false")) {
                todos[i].style.display = null;
            }
        }
    })
}

function addEventListenerShowCompleted() {
    document.querySelector("a[href='#completed']").addEventListener('click', function () {
        let todos = document.querySelector(".todo-list").querySelectorAll("li");
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains("false")) {
                todos[i].style.display = "none";
            }
            if (todos[i].classList.contains("completed")) {
                todos[i].style.display = null;
            }
        }
    })
}

function addTodo(input) {
    let todoTag = document.createElement('li');
    todoTag.classList.add('false');
    todoTag.innerHTML =
        ` <div class="view">
                <input class="toggle" type="checkbox" onclick="check(this);"/>
                <label class="label" ondblclick="edit(this)">${input}</label>
                <button class="destroy" onclick="remove(this)"></button>
          </div>
          <input class="edit" value="${input}"/>`;
    document.getElementById("todo-list").appendChild(todoTag);
    updateCount();
}

function updateCount() {
    let sample = document.querySelector(".todo-list").querySelectorAll("li");
    document.querySelector(".todo-count").innerHTML = "총 " + `<strong>${sample.length}</strong>` + " 개";
}

function edit(self) {
    let classList = self.parentNode.parentElement.classList;
    classList.add("editing");

    self.parentNode.parentElement.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            classList.remove("editing");
            return;
        }
        if (event.key === 'Enter') {
            self.innerHTML = self.parentNode.parentElement.querySelector(".edit").value;
            classList.remove("editing");
            return;
        }
    })
}

function check(self) {
    let classList = self.parentNode.parentElement.classList;
    if (classList.contains("false")) {
        self.setAttribute("checked", "");
        classList.replace("false", "completed");
        return;
    }
    if (classList.contains("completed")) {
        self.removeAttribute("checked")
        classList.replace("completed", "false");
    }
}

function remove(self) {
    self.parentNode.parentElement.remove();
    updateCount();
}


