function onEnterKeypressHandler(event) {
    if (event.keyCode === 13) {
        let input = document.getElementById("new-todo-title").value;
        let newTodo = document.createElement("li");

        newTodo.classList.add("new");
        newTodo.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${input}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${input} />
        `;

        document.getElementById("new-todo-title").value = "";
        document.getElementById("todo-list").append(newTodo);

        let items = document.getElementsByClassName("new");
        let countItems = items.length;
        document.querySelector("span strong").innerHTML = countItems.toString();
    }
}

function checkTodo(event) {
    if (event.target.checked === true) {
        event.target.setAttribute('checked', "true");
        event.target.parentNode.parentNode.classList.add("completed");
    } else if (event.target.checked === false) {
        event.target.setAttribute('checked', "false");
        event.target.parentNode.parentNode.classList.remove("completed");
    }
}

function makeTodoEditing(event) {
    if (event.target.className === 'label') {
        let changeText = event.target;
        event.target.parentNode.parentNode.classList.add("editing");
        event.target.parentNode.parentNode.addEventListener("keyup", (event) => {
            if (event.target.className === 'edit' && event.keyCode === 13 && event.target.value !== "") {
                changeText.innerHTML = event.target.value;
                event.target.parentNode.classList.remove("editing");
            }

            if (event.target.className === 'edit' && event.keyCode === 27) {
                event.target.value = changeText.innerText;
                event.target.parentNode.classList.remove("editing");
            }
        })
    }
}

function deleteTodo(event) {
    if (event.target.className === 'destroy') {
        event.target.parentNode.parentNode.remove();
        let items = document.getElementsByClassName("new");
        let countItems = items.length;
        document.querySelector("span strong").innerHTML = countItems.toString();
    }
}

function allTodo(event) {
    if (event.target.className === 'all selected') {
        let toDos = document.getElementsByClassName("new");

        for (let i = 0; i < toDos.length; i++) {
            toDos[i].style.display = "block";
        }

        let countItems = toDos.length;
        document.querySelector("span strong").innerHTML = countItems.toString();
    }
}

function activeTodo(event) {
    if (event.target.className === 'active') {
        let toDos = document.getElementsByClassName("new");

        let countItems = 0;
        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].classList.contains("completed")) {
                toDos[i].style.display = "none";
            } else {
                toDos[i].style.display = "block";
                countItems++;
            }
        }

        document.querySelector("span strong").innerHTML = countItems.toString();
    }
}

function completeTodo(event) {
    if (event.target.className === 'completed') {
        let toDos = document.getElementsByClassName("new");

        let countItems = 0;
        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].classList.contains("completed")) {
                toDos[i].style.display = "block";
                countItems++;
            } else {
                toDos[i].style.display = "none";
            }
        }

        document.querySelector("span strong").innerHTML = countItems.toString();
    }
}

document.getElementById("new-todo-title").addEventListener('keypress', onEnterKeypressHandler)
document.addEventListener("click", checkTodo);
document.addEventListener("dblclick", makeTodoEditing);
document.addEventListener("click", deleteTodo);
document.addEventListener("click", activeTodo);
document.addEventListener("click", allTodo);
document.addEventListener("click", completeTodo);