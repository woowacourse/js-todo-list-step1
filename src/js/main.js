const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const $todoCount = document.querySelector(".todo-count");
const $all = document.querySelector(".all");
const $active = document.querySelector(".active");
const $completed = document.querySelector(".completed");
const $filters = document.querySelector(".filters");

const CONTENT = 'content'
const COMPLETED = 'completed'
const ID = 'id'
const FALSE = 'false'
const CHECKED = 'checked'
const SELECTED = 'selected'
const EDITING = 'editing'

let todos = {}

const updateCount = (count) => $todoCount.querySelector("strong").innerText = count

const list = (id, completed, value) => `
            <li id="${id}" class=${completed ? COMPLETED : FALSE}>
                <div class="view">
                    <input class="toggle" type="checkbox" id="${id}"/>
                    <label class="label">${value}</label>
                    <button class="destroy" id="${id}"></button>
                </div>
                <input class="edit" value="${value}" />
            </li>`;

const initialAddTodoInput = (id, content) => {
    $todoUl.insertAdjacentHTML('beforeend', list(id, false, content))
    const temporary = {...todos}
    temporary[id] = {
        'completed': false,
        'content': content
    }
    todos = {...temporary}
    $todoInput.value = '';
}

const addTodoInput = ({key}) => {
    if (key === "Enter" && $todoInput.value !== "") {
        const id = Date.now();
        const content = $todoInput.value;
        initialAddTodoInput(id, content)
        updateCount(Object.keys(todos).length)
    }
}

const toggleTodo = (item, targetId, boolean) => {
    item.toggle(FALSE);
    item.toggle(COMPLETED);
    const temporary = {...todos}
    temporary[targetId][COMPLETED] = boolean
    todos = {...temporary}
}

const toggleCase = (target) => {
    if (target.className === 'toggle') {
        const item = target.closest("li").classList
        const targetId = target.closest("li").getAttribute(ID)
        target.toggleAttribute(CHECKED)
        if (item.contains(FALSE)) {
            toggleTodo(item, targetId, true)
            return;
        }
        if (item.contains(COMPLETED)) {
            toggleTodo(item, targetId, false)
        }
    }
}

const destroyCase = (target) => {
    if (target.className === 'destroy') {
        const targetId = target.closest("li").getAttribute(ID)
        $todoUl.removeChild(target.closest("li"))
        const temporary = {...todos}
        delete temporary[targetId]
        todos = {...temporary}
        updateCount(Object.keys(todos).length)
    }
}

const modifyTodoState = ({target}) => {
    toggleCase(target)
    destroyCase(target)
}

const enterCase = (key, event, currentTarget, previousInput, targetId) => {
    if (key === "Enter") {
        const currentContent = event.target.value;
        previousInput.innerText = currentContent;
        currentTarget.classList.toggle(EDITING)
        const temporary = {...todos}
        temporary[targetId][CONTENT] = currentContent
        todos = {...temporary}
    }
}

const escapeCase = (key, currentTarget) => {
    if (key === "Escape") {
        currentTarget.classList.toggle(EDITING)
    }
}

const editContent = (event) => {
    const {key} = event
    const {currentTarget} = event
    const previousInput = currentTarget.querySelector(".label")
    const targetId = event.currentTarget.getAttribute(ID)
    enterCase(key, event, currentTarget, previousInput, targetId)
    escapeCase(key, currentTarget)
}

const editingMode = ({target}) => {
    const $li = target.closest("li")
    $li.classList.toggle(EDITING)
    $li.addEventListener("keyup", editContent)
}

$todoUl.addEventListener("click", modifyTodoState)
$todoInput.addEventListener("keyup", addTodoInput)
$todoUl.addEventListener("dblclick", editingMode)

const toggleOnClickedButton = (target) => {
    $filters.querySelector(".selected").classList.remove(SELECTED)
    target.classList.add(SELECTED)
}

const showAll = ({target}) => {
    $todoUl.innerHTML = Object.keys(todos)
        .map(id => list(id, todos[id][COMPLETED], todos[id][CONTENT]))
        .join("")

    updateCount(Object.keys(todos).length)

    toggleOnClickedButton(target)
}

const showActive = ({target}) => {
    $todoUl.innerHTML = Object.keys(todos)
        .filter(id => todos[id][COMPLETED] === false)
        .map(id => list(id, todos[id][COMPLETED], todos[id][CONTENT]))
        .join("")

    updateCount(Object.keys(todos)
        .filter(id => todos[id][COMPLETED] === false)
        .length)

    toggleOnClickedButton(target)
}

const showCompleted = ({target}) => {
    $todoUl.innerHTML = Object.keys(todos)
        .filter(id => todos[id][COMPLETED] === true)
        .map(id => list(id, todos[id][COMPLETED], todos[id][CONTENT]))
        .join("")

    updateCount(Object.keys(todos)
        .filter(id => todos[id][COMPLETED] === true)
        .length)

    toggleOnClickedButton(target)
}

$all.addEventListener("click", showAll)
$active.addEventListener("click", showActive)
$completed.addEventListener("click", showCompleted)