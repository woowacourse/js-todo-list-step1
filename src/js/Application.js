const ENTER_CODE = 13;
const ESC_CODE = 27;
const CHECKBOX_CLASS_NAME = "toggle"
const DESTROY_BUTTON_CLASS_NAME = "destroy"
const TODO_CONTENT_CLASS_NAME = "label"
const EDIT_CONTENT_CLASS_NAME = "edit"

const newTodo = document.querySelector("#new-todo-title")
const todoBox = document.querySelector("#todo-list");
const countLabel = document.querySelector("strong");
const buttonBox = document.querySelector(".filters")

window.onload = () => {
    enterDownNewTodo()
    enterUpNewTodo()
    clickCheckBoxOrDestroy()
    doubleClickEditTodo()
    clickStateSelectButton()
    refreshCount()
};

function enterDownNewTodo() {
    newTodo.addEventListener("keydown", function (e) {
        if (e.keyCode === 229) {
            return
        }
        if (e.keyCode !== ENTER_CODE) {
            enterDownNewTodo()
            return
        }
        todoBox.insertAdjacentHTML("beforeend", makeTodo(newTodo.value))
        e.target.value = ""
        refreshView()
    }, {once: true})
}

function enterUpNewTodo() {
    newTodo.addEventListener("keyup", function (e) {
        if (e.keyCode !== ENTER_CODE) {
            return
        }
        enterDownNewTodo()
    })
}


function makeTodo(value) {
    return `<li class="false">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label class="label">${value}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀"/> 
</li>`
}

function clickCheckBoxOrDestroy() {
    todoBox.addEventListener("click", function (e) {
        const clickedClass = e.target.getAttribute("class")
        if (clickedClass === CHECKBOX_CLASS_NAME) {
            const todo = e.target.closest("li")
            todo.classList.toggle("completed")
        }
        if (clickedClass === DESTROY_BUTTON_CLASS_NAME) {
            const todo = e.target.closest("li")
            todoBox.removeChild(todo)
        }
        refreshView()
    })
}

function doubleClickEditTodo() {
    todoBox.addEventListener("dblclick", function (e) {
        const clickedClass = e.target.getAttribute("class")
        if (clickedClass === TODO_CONTENT_CLASS_NAME) {
            const todo = e.target.closest("li")
            const labelTodo = todo.getElementsByClassName(TODO_CONTENT_CLASS_NAME).item(0)
            const editTodo = todo.getElementsByClassName(EDIT_CONTENT_CLASS_NAME).item(0)
            editTodo.value = labelTodo.innerText
            todo.classList.add("editing")
            editTodo.focus()
            editTodo.addEventListener("keyup", enterUpEditTodo)
        }
    })
}

function enterUpEditTodo(e) {
    if (e.keyCode !== ENTER_CODE && e.keyCode !== ESC_CODE) {
        return
    }
    if (e.keyCode === ENTER_CODE) {
        enterKeyUp()
    }
    if (e.keyCode === ESC_CODE) {
        escKeyUp()
    }

    function enterKeyUp() {
        const todo = e.target.closest("li")
        const labelTodo = todo.getElementsByClassName(TODO_CONTENT_CLASS_NAME).item(0)
        const editTodo = todo.getElementsByClassName(EDIT_CONTENT_CLASS_NAME).item(0)
        labelTodo.innerText = editTodo.value;
        editTodo.value = ""
        todo.classList.remove("editing")
    }

    function escKeyUp() {
        const todo = e.target.closest("li")
        todo.classList.remove("editing")
    }
}

function refreshCount() {
    const todos = todoBox.querySelectorAll("li")
    const counting =
        Array.from(todos)
            .filter(todo => !todo.classList.contains("hidden"))
            .length
    countLabel.innerText = counting.toString();
}

function clickStateSelectButton() {
    buttonBox.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") {
            return
        }
        unSelectButtons();
        e.target.classList.toggle("selected")
        refreshView()
    })

    function unSelectButtons() {
        buttonBox.querySelectorAll("A").forEach(button => button.classList.remove("selected"))
    }
}

function refreshView() {
    const todos = todoBox.querySelectorAll("li")
    const hidden = "hidden"
    const state = getSelectedState()

    todos.forEach(todo => todo.classList.remove("hidden"))
    if (state === "completed") {
        Array.from(todos)
            .filter(todo => !todo.classList.contains("completed"))
            .forEach(todo => todo.classList.add(hidden))
    }
    if (state === "active") {
        Array.from(todos)
            .filter(todo => todo.classList.contains("completed"))
            .forEach(todo => todo.classList.add(hidden))
    }
    refreshCount()
}

function getSelectedState() {
    const button = Array.from(buttonBox.querySelectorAll("A"))
        .find(button => button.classList.contains("selected"));

    if (button.classList.contains("active")) {
        return "active"
    }
    if (button.classList.contains("completed")) {
        return "completed"
    }
    return "all"
}
