window.onload = function() {
    const newTodo = document.getElementById("new-todo-title");
    const todoList = document.getElementById("todo-list");
    const listCount = document.getElementsByClassName("todo-count")[0].childNodes[1];
    const all = document.getElementsByClassName("all")[0];
    const active = document.getElementsByClassName("active")[0];
    const completed = document.getElementsByClassName("completed")[0];

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
            listCount.innerHTML = parseInt(listCount.innerHTML) + 1;
            e.target.value = ""; 
        }
        
    }

    all.addEventListener("click", filterAll);
    function filterAll() {
        active.classList.remove("selected");
        completed.classList.remove("selected");
        this.classList.add("selected");

        let index = 0;
        const todoListLI = todoList.getElementsByTagName("li");
        for (index; index < todoListLI.length; index++) {
            todoListLI[index].style.display = "block"
        }
        setCount(index);
    }

    active.addEventListener("click", filterActive);
    function filterActive(){
        all.classList.remove("selected");
        completed.classList.remove("selected");
        this.classList.add("selected");
        const todoListLI = todoList.getElementsByTagName("li");
        let index = 0;
        for (let i = 0; i < todoListLI.length; i++) {
            if(todoListLI[i].className == "todo") {
                todoListLI[i].style.display = "block"
                index++;
            }
            else {
                todoListLI[i].style.display = "none"
            }
        }
        setCount(index);
    }

    completed.addEventListener("click", filterCompleted);
    function filterCompleted(){
        all.classList.remove("selected");
        active.classList.remove("selected");
        const todoListLI = todoList.getElementsByTagName("li");

        let index = 0;
        for (let i = 0; i < todoListLI.length; i++) {
            if(todoListLI[i].className == "completed") {
                todoListLI[i].style.display = "block"
                index++;
            }
            else {
                todoListLI[i].style.display = "none"
            }
        }
        setCount(index);
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
    const listCount = document.getElementsByClassName("todo-count")[0].childNodes[1];
    todoParent.parentNode.removeChild(todoParent);
    listCount.innerHTML = parseInt(listCount.innerHTML) - 1;
}

function editTodo(editInput) {
    const editInputParent = editInput.parentNode;
    editInputParent.classList.add('editing');
}

function setCount(index) {
    const listCount = document.getElementsByClassName("todo-count")[0].childNodes[1];
    listCount.innerHTML = index;
}

