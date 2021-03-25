const ENTER_CODE = 13;
const ESC_CODE = 27;
const CHECKBOX_CLASS_NAME = "toggle"
const DESTROY_BUTTON_CLASS_NAME = "destroy"
const TODO_CONTENT_CLASS_NAME = "label"
const EDIT_CONTENT_CLASS_NAME = "edit"

const newTodo = document.querySelector("#new-todo-title")
const todoBox = document.querySelector("#todo-list");

window.onload = () => {
    hangKeyDownEvent()
    hangKeyUpEvent()
    hangClickEvent()
    hangEditEvent()
};

function hangKeyDownEvent() {
    newTodo.addEventListener("keydown", function (e) {
        if (e.keyCode === 229) {
            return
        }
        if (e.keyCode !== ENTER_CODE) {
            hangKeyDownEvent()
            return
        }
        todoBox.insertAdjacentHTML("beforeend", makeTodo(newTodo.value))
        e.target.value = ""
    }, {once: true})
}

function hangKeyUpEvent() {
    newTodo.addEventListener("keyup", function (e) {
        if (e.keyCode !== ENTER_CODE) {
            return
        }
        hangKeyDownEvent()
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

function hangClickEvent() {
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
    })
}

function hangEditEvent() {
    todoBox.addEventListener("dblclick", function (e) {
        const clickedClass = e.target.getAttribute("class")
        if (clickedClass === TODO_CONTENT_CLASS_NAME) {
            const todo = e.target.closest("li")
            const labelTodo = todo.getElementsByClassName(TODO_CONTENT_CLASS_NAME).item(0)
            const editTodo = todo.getElementsByClassName(EDIT_CONTENT_CLASS_NAME).item(0)
            editTodo.value = labelTodo.innerText
            todo.classList.add("editing")
            editTodo.focus()
            editTodo.addEventListener("keyup", keyUpAtEditTodo)
        }
    })
}

function keyUpAtEditTodo(e) {
    const todo = e.target.closest("li")

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
        const labelTodo = todo.getElementsByClassName(TODO_CONTENT_CLASS_NAME).item(0)
        const editTodo = todo.getElementsByClassName(EDIT_CONTENT_CLASS_NAME).item(0)
        labelTodo.innerText = editTodo.value;
        editTodo.value = ""
        todo.classList.remove("editing")
    }

    function escKeyUp() {
        todo.classList.remove("editing")
    }
}

