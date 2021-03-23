let todo = document.querySelector('#new-todo-title');

function addTodoItem(event) {
    if (event.keyCode === 13) {
        addTodo();
    }
}

todo.addEventListener('keyup', addTodoItem);

function addTodo()  {
    const addValue = document.getElementById("new-todo-title").value;

    const li = document.createElement("li");
    li.appendChild(createDiv(addValue));
    li.appendChild(createEditInput(addValue));

    document
        .getElementById('todo-list')
        .appendChild(li);

    document.getElementById("new-todo-title").value = "";
}

function createDiv(addValue) {
    const div = document.createElement("div");
    div.setAttribute("class", "view");
    div.appendChild(createCheckboxInput());
    div.appendChild(createLabel(addValue));
    div.appendChild(createButton());
    return div;
}

function createCheckboxInput() {
    const input = document.createElement("input");
    input.setAttribute("class", "toggle");
    input.setAttribute("type", "checkbox");
    return input;
}

function createLabel(addValue) {
    const label = document.createElement("label");
    label.setAttribute("class", "label");
    label.innerText = addValue;
    return label;
}

function createButton() {
    const button = document.createElement("button");
    button.setAttribute("class", "destroy");
    return button;
}

function createEditInput(addValue) {
    const editInput = document.createElement("input");
    editInput.setAttribute("class", "edit");
    editInput.setAttribute("value", addValue);
    return editInput;
}