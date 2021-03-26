const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const $todoCount = document.querySelector(".todo-count");
const $all = document.querySelector(".all");
const $active = document.querySelector(".active");
const $completed = document.querySelector(".completed");

const CONTENT = 'content'
const COMPLETED = 'completed'
const ID = 'id'
const FALSE = 'false'
const CHECKED = 'checked'

let todos = {}

const updateCount = (count) => $todoCount.querySelector("strong").innerText = count
const list = (id, completed, value) => `
            <li id="${id}" class=${completed ? COMPLETED : FALSE }>
                <div class="view">
                    <input class="toggle" type="checkbox" id="${id}"/>
                    <label class="label">${value}</label>
                    <button class="destroy" id="${id}"></button>
                </div>
                <input class="edit" value="${value}" />
            </li>`;


const addTodoInput = ({key}) => {
    if (key === "Enter" && $todoInput.value !== "") {
        const id = Date.now();
        const content = $todoInput.value;

        $todoUl.insertAdjacentHTML('beforeend', list(id, false, content))
        const temporary = {...todos}
        temporary[id] = {
            'completed': false,
            'content':  content
        }
        todos = {...temporary}
        $todoInput.value = '';

        updateCount(Object.keys(todos).length)
    }
}

const modifyTodoState = ({target}) => {
    if (target.className === 'toggle') {
        const item = target.closest("li").classList
        const targetId = target.closest("li").getAttribute("id");
        if (item.contains('false')) {
            item.toggle('false');
            item.toggle('completed');
            temporary = {...todos}
            temporary[targetId]['completed'] = true;
            todos = {...temporary}
            return;
        }
        if (item.contains('completed')) {
            item.toggle('false');
            item.toggle('completed');
            temporary = {...todos}
            temporary[targetId]['completed'] = false;
            todos = {...temporary}
            return;
        }

        target.toggleAttribute(CHECKED)
    }

    if (target.className === 'destroy') {
        const targetId = target.closest("li").getAttribute("id");
        $todoUl.removeChild(target.closest("li"))
        temporary = {...todos}
        delete temporary[targetId]
        todos = {...temporary}
        updateCount(Object.keys(todos).length)
    }
}


const editContent = (event) => {
    const {key} = event
    const {currentTarget} = event
    const previousInput = currentTarget.querySelector(".label");
    const targetId = event.currentTarget.getAttribute("id");
    if (key === "Enter") {
        const currentContent = event.target.value;
        previousInput.innerText = currentContent;
        currentTarget.classList.toggle("editing")
        temporary = {...todos}
        temporary[targetId]['content'] = currentContent;
        todos = {...temporary}
        console.log(todos)
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

function showAll() {
    const allTodos = Object.keys(todos)
        .map(id => list(id, todos[id]['completed'], todos[id]['content']))
        .join('')
    $todoUl.innerHTML = allTodos;
    updateCount(Object.keys(todos).length)
}

$all.addEventListener("click", showAll)

function showActive() {

    const activeList = Object.keys(todos)
        .filter(id => todos[id]['completed'] === false)
        .map(id => list(id, todos[id]['completed'], todos[id]['content']))
        .join("");

    $todoUl.innerHTML = activeList;
    updateCount(Object.keys(todos).filter(id => todos[id]['completed'] === false).length)

}

$active.addEventListener("click", showActive)

function showCompleted() {

    const completedTodos = Object.keys(todos)
        .filter(id => todos[id]['completed'] === true)
        .map(id => list(id, todos[id]['completed'], todos[id]['content']))
        .join("");

    $todoUl.innerHTML = completedTodos;
    updateCount(Object.keys(todos).filter(id => todos[id]['completed'] === true).length)

}

$completed.addEventListener("click", showCompleted)

