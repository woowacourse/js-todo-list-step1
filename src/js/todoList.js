import {addTodoItem, removeTodoItem, updateTodoItem, renderTodoList} from './store/todoListStore.js';

const $todoInput = document.querySelector("#new-todo-title");
const $toggleParentList = document.querySelector(".todo-list");
const EMPTY_STRING = "";

$todoInput.addEventListener("keyup", onAddTodoItem);
$toggleParentList.addEventListener("keyup", onEditTodoItem)
$toggleParentList.addEventListener("click", onClickTodoItem);
$toggleParentList.addEventListener("dblclick", onEditModeTodoItem);

function onAddTodoItem(event) {
    const todoTitle = event.target.value;
    if (event.key === "Enter" && todoTitle !== "") {
        addTodoItem(Date.now(), todoTitle);
        event.target.value = EMPTY_STRING;
    }
}

function onClickTodoItem(event){
    onToggleTodoItem(event);
    onRemoveTodoItem(event);
}

function onRemoveTodoItem(event) {
    if (event.target && event.target.className === "destroy") {
        removeTodoItem(getOnEventClosestTodoItemId(event));
    }
}

function onEditModeTodoItem(event) {
    event.target.closest(".todo-item").classList.add("editing");
}

function onEditTodoItem(event) {
    if (event.target && event.target.className === "edit") {
        const todoTitle = event.target.value;

        if (event.key === "Enter" && todoTitle !== "") {
            updateTodoItem(getOnEventClosestTodoItemId(event), todoTitle);
        } else if (event.key === "Escape") {
            renderTodoList();
        }
    }
}

function getOnEventClosestTodoItemId(event){
    return event.target.closest(".todo-item").id;
}

function onToggleTodoItem(event) {
    if (event.target && event.target.className === "toggle") {
        event.target.closest("li").classList.toggle("completed");
    }
}