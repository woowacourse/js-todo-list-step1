const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $todoCount = document.querySelector(".todo-count strong")
const $todoApp = document.querySelector(".todoapp");
const $filterList = document.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("click", onDestroyTodoItem);
$todoList.addEventListener("dblclick", onEditingTodoItem);
$todoList.addEventListener("keyup", onEditTodoItemComplete);
$filterList.addEventListener("click", onFilterTodoItem);
$todoApp.addEventListener("click", onCountChange);
$todoApp.addEventListener("keyup", onCountChange);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
        event.target.value = "";
    }
    onCountChange();
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
    onCountChange();
}

function onDestroyTodoItem(event) {
    if (event.target.className === 'destroy') {
        $todoList.removeChild(event.target.closest("li"))
    }
    event.stopPropagation();
    onCountChange();
}

function onEditingTodoItem(event) {
    if (event.target.className === 'label') {
        let beforeText = event.target.innerText
        event.target.closest("li").classList.toggle("editing");
        let $edit = event.target.parentElement.parentElement.querySelector('.edit')
        $edit.value = beforeText
    }
    event.stopPropagation();
    onCountChange();
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
    onCountChange();
}

function onFilterTodoItem(event) {
    let selectedButton = $filterList.querySelector('.selected');
    selectedButton.classList.remove('selected')

    const className = event.target.className;
    if (className === 'all') {
        viewAll($todoList.children)
    } else if (className === 'active') {
        viewOrHidden($todoList.children, '')
    } else if (className === 'completed') {
        viewOrHidden($todoList.children, 'completed')
    }

    event.target.classList.add('selected')
    event.stopPropagation();
    onCountChange();
}

function viewAll(todoList) {
    for (const todoItem of todoList) {
        let div = todoItem.querySelector('div');
        div.classList.remove('hidden')
        div.classList.add('view')
    }
}

function viewOrHidden(todoList, status) {
    for (const todoItem of todoList) {
        let div = todoItem.querySelector('div');
        if (todoItem.className === status) {
            div.classList.remove('hidden')
            div.classList.add('view')
        } else {
            div.classList.remove('view')
            div.classList.add('hidden')
        }
    }
}

function onCountChange() {
    const todos = $todoList.querySelectorAll('div');
    let count = 0
    for (const todo of todos) {
        console.log(todo)
        if (todo.className === 'view') {
            count += 1;
        }
    }
    $todoCount.innerHTML = count
}
