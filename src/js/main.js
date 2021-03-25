const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const $todoCount = document.querySelector(".todo-count");
const $all = document.querySelector(".all");
const $active = document.querySelector(".active");
const $completed = document.querySelector(".completed");


let todos = {}

const updateCount = () => $todoCount.querySelector("strong").innerText = $todoUl.children.length

const addTodoInput = ({key}) => {
    if (key === "Enter" && $todoInput.value !== "") {
        const id = new Date().getTime();
        const value = $todoInput.value;
        const list = `
            <li id="${id}" class="false">
                <div class="view">
                    <input class="toggle" type="checkbox" id="${id}"/>
                    <label class="label">${value}</label>
                    <button class="destroy" id="${id}"></button>
                </div>
                <input class="edit" value="${value}" />
            </li>`;
        $todoUl.insertAdjacentHTML('beforeend', list);
        const temporary = {...todos}
        temporary[id] = {
            'completed': false,
            'contents': value
        }
        todos = {... temporary}
        console.log(todos)
        $todoInput.value = '';
        updateCount()
    }
}

const modifyTodoState = ({target}) => {
    if (target.className === 'toggle') {
        target.closest("li").classList.toggle("completed");
        target.closest("li").classList.toggle("false");

        target.toggleAttribute("checked")
    }

    if (target.className === 'destroy') {
        $todoUl.removeChild(target.closest("li"))
        updateCount()
    }
}


const editContent = (event) => {
    const {key} = event
    const {currentTarget} = event
    const previousInput = currentTarget.querySelector(".label");
    if (key === "Enter") {
        previousInput.innerText = event.target.value;
        currentTarget.classList.toggle("editing")
    }
    if (key === "Escape") {
        currentTarget.classList.toggle("editing")
    }
}

const editingMode = ({target}) => {
    const $li = target.closest("li");
    $li.classList.toggle("editing");
    $li.addEventListener("keyup", editContent);
}

$todoUl.addEventListener("click", modifyTodoState)
$todoInput.addEventListener("keyup", addTodoInput)
$todoUl.addEventListener("dblclick", editingMode)
$all.addEventListener("click", () => console.log("all"))

