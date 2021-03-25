const ENTER_CODE = 13;

const newTodo = document.querySelector("#new-todo-title")
const todoBox = document.querySelector("#todo-list");

window.onload = () => {
    hangKeyDownEvent()
    hangKeyUpEvent()
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
