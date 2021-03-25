const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $filterList = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("click", onDestroyTodoItem);
$todoList.addEventListener("dblclick", onEditingTodoItem);
$todoList.addEventListener("keyup", onEditTodoItemComplete);
$filterList.addEventListener("click", onFilterTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
}

function renderTodoItemTemplate(title) {
    return ` <li>
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀">
              </li>`;
}

function onToggleTodoItem(event) {
    if (event.target.className === 'toggle') {
        event.target.closest("li").classList.toggle("completed");
    }
    event.stopPropagation();
}

function onDestroyTodoItem(event) {
    if (event.target.className === 'destroy') {
        $todoList.removeChild(event.target.closest("li"))
    }
    event.stopPropagation();
}

function onEditingTodoItem(event) {
    if (event.target.className === 'label') {
        let beforeText = event.target.innerText
        event.target.closest("li").classList.toggle("editing");
        let $edit = event.target.parentElement.parentElement.querySelector('.edit')
        $edit.value = beforeText
    }
    event.stopPropagation();
}

function onEditTodoItemComplete(event) {
    if (event.target.className !== 'edit') {
        return;
    }

    const editedTodoTitle = event.target.value
    const $label = event.target.parentElement.querySelector('.label')
    const $li = event.target.closest("li");

    if (event.key === "Enter" && editedTodoTitle !== "") {
        $li.classList.toggle("editing");
        $label.innerText = editedTodoTitle

    } else if (event.key === "Escape") {
        $li.classList.toggle("editing");
    }

    event.stopPropagation();
}

function onFilterTodoItem(event) {
    const className = event.target.className;
    if (className === 'all selected') {
        showAll()
    } else if (className === 'active') {
        showActive()
    } else if (className === 'completed') {
        showCompleted()
    }
    event.stopPropagation();
}

function showAll() {
    for (const $todoItem of $todoList.children) {
        let $div = $todoItem.querySelector('div');
        $div.classList.remove('hidden')
        $div.classList.add('view')
    }
}

function showActive() {
    for (const $todoItem of $todoList.children) {
        show($todoItem, '')
    }
}

function showCompleted() {
    for (const $todoItem of $todoList.children) {
        show($todoItem, 'completed')
    }
}

function show(todo, status) {
    let $div = todo.querySelector('div');
    if (todo.className === status) {
        $div.classList.remove('hidden')
        $div.classList.add('view')
    } else {
        $div.classList.remove('view')
        $div.classList.add('hidden')
    }
}
