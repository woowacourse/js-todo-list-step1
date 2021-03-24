window.onload = function() {
    const newTodo = document.getElementById("new-todo-title");
    const todoList = document.getElementById("todo-list");
    const listCount = document.getElementsByClassName("todo-count");

    newTodo.addEventListener("keydown",inputTodo);
    function inputTodo(e) {
        if(e.keyCode == 13){
            const inputText = newTodo.value;
            const newTodoLI = document.createElement('li');
            newTodoLI.className = "todo";
            newTodoLI.innerHTML = `
            <div class="view" ondblclick = "editTodo(this)">
                <input class="toggle" type="checkbox" onclick="check(this)">
                <label class="label">${inputText}</label>
                <button class="destroy" onclick= "destroyTodo(this)"></button>
            </div>
            <input class="edit" value="${inputText}" />`;
            newTodoLI.addEventListener("keydown", changeMode);
            todoList.appendChild(newTodoLI);
            
        }
    }
    
    
}
function changeMode(e){
    const originalValue = this.getElementsByTagName("label")[0].innerHTML;
    const editedValue = this.getElementsByTagName("input")[1].value;

    if(e.keyCode == 27) {
        this.classList.remove("editing");
    }
    if(e.keyCode == 13 && (originalValue != editedValue)) {
        this.getElementsByTagName("label")[0].innerHTML = editedValue;
        this.classList.remove("editing");
    }
}
function check(box) {
    if (box.checked == true) {
        box.parentNode.parentNode.className = "completed";
    }
    if (box.checked == false) {
        box.parentNode.parentNode.className = "todo";
    }
}

function destroyTodo(todo) {
    const todoParent  = todo.parentNode.parentNode;
    todoParent.parentNode.removeChild(todoParent);
}

function editTodo(editInput) {
    const editInputParent = editInput.parentNode;
    editInputParent.classList.add('editing');
}