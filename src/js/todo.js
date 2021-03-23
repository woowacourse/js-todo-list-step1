document.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        const todoItem = document.getElementById("new-todo-title").value;
        addTodo(todoItem);
    }
})

addEventListenerShowCompleted();
addEventListenerShowActive();
addEventListenerShowAll();

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
    const todoTag = document.createElement('li');
    todoTag.classList.add(false);
    todoTag.innerHTML =
        ` <div class="view">
                <input class="toggle" type="checkbox" onclick="clicked(this);"/>
                <label class="label" ondblclick="doubleClick(this)">${input}</label>
                <button class="destroy" onclick="remove(this)"></button>
               </div>
               <input class="edit" value="${input}"/>`;
    document.getElementById("todo-list").appendChild(todoTag);
    updateCount();
}

function updateCount(){
    sample = document.querySelector(".todo-list").querySelectorAll("li");
    console.log(sample.length);
    document.querySelector(".todo-count").innerHTML = "총 "+ `<strong>${sample.length}</strong>`+ " 개";
}

function doubleClick(self) {
    classList = self.parentNode.parentElement.classList;
    classList.add("editing");
    document.addEventListener('keydown', function (e) {
        if(e.key == 'Escape'){
            classList.remove("editing")
        }
    })
}

function clicked(self){
    classList = self.parentNode.parentElement.classList;
    if(classList.contains("false")){
        self.setAttribute("checked", "");
        classList.replace("false", "completed");
        return;
    }
    if(classList.contains("completed")){
        self.removeAttribute("checked")
        classList.replace("completed", "false");
        return;
    }
}

function remove(self){
    self.parentNode.parentElement.remove();
}


