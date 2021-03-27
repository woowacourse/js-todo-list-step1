const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
let $all = document.querySelector(".all");
let $completed = document.querySelector(".completed");
let $notCompleted = document.querySelector(".active");

let $listCount = 0;

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$all.addEventListener('click', showAllItems);
$completed.addEventListener('click', showCompletedItems);
$notCompleted.addEventListener('click', showNotCompletedItems);

function showCount(count) {
    let todoCount = document.querySelector("strong");
    todoCount.innerText = count;
}

function onClickDeletedItem(deletedItem) {
    const deleteDiv = deletedItem.parentNode;
    const deleteItem = deleteDiv.parentNode;
    const todoList = deleteItem.parentNode;
    todoList.removeChild(deleteItem);
    $listCount -= 1;
    showCount($listCount);
}

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    const todoList = document.getElementById("todo-list");
    if (event.key === "Enter" && todoTitle !== "") {
        todoList.appendChild(renderTodoItemTemplate(todoTitle));
        event.target.value = "";
        $listCount += 1;
    }
    showCount($listCount);
}

function onToggleTodoItem(event) {
    if(event.target.value === "on"){
        event.target.closest("input").classList.toggle("checked");
        console.log( event.target.closest("input"));
        event.target.closest("li").classList.toggle("completed");
    }
}

function onDoubleClickedItem(event) {
    let updatedLabel = event.target;

    const updatedLi = updatedLabel.closest('li');
    updatedLi.classList.add("editing");

    let input = updatedLi.querySelector(".edit");
    input.addEventListener('keydown', function (innerEvent) {
        if (innerEvent.key === 'Esc' || innerEvent.key === 'Escape') {
            updatedLi.classList.remove("editing");
        }

        if (innerEvent.key === 'Enter') {
            event.target.textContent = input.value;
            updatedLi.classList.remove("editing");
        }
    });
}

function renderTodoItemTemplate(input) {
    let addLi = document.createElement("li");
    addLi.innerHTML = `
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label" ondblclick="onDoubleClickedItem(event)">${input}</label>
                      <button class="destroy" onclick="onClickDeletedItem(this)"></button>
                  </div>
                  <input class="edit" value="새로운 타이틀"> 
              `;
    return addLi;
}

function showAllItems() {
    if(!$all.classList.contains("selected")) {
        $all.classList.toggle("selected");
    }
    if($notCompleted.classList.contains("selected")) {
        $notCompleted.classList.toggle("selected");
    }
    if($completed.classList.contains("selected")) {
        $completed.classList.toggle("selected");
    }

    let count = 0;
    const items = $todoList.querySelectorAll("li");
    for(let item of items) {
        item.style.display = "block"
        count += 1;
    }
    showCount(count);
}

function showCompletedItems() {
    $completed.classList.toggle("selected");
    if($all.classList.contains("selected")) {
        $all.classList.toggle("selected");
    }
    if($notCompleted.classList.contains("selected")) {
        $notCompleted.classList.toggle("selected");
    }

    let count = 0;
    const items = $todoList.querySelectorAll("li");
    for(let item of items) {
        if(item.classList.contains("completed")) {
            item.style.display = "block";
            count += 1;
        } else {
            item.style.display = "none";
        }
    }
    showCount(count);
}

function showNotCompletedItems() {
    $notCompleted.classList.toggle("selected");
    if($all.classList.contains("selected")) {
        $all.classList.toggle("selected");
    }
    if($completed.classList.contains("selected")) {
        $completed.classList.toggle("selected");
    }

    let count = 0;
    const items = $todoList.querySelectorAll("li");
    for(let item of items) {
        if(item.classList.contains("completed")) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
            count += 1;
        }
    }
    showCount(count);
}

showCount();