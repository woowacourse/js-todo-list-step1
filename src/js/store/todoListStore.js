import itemTemplate from "../template/todoItemTemplate.js";

export {addTodoItem, updateTodoItem, removeTodoItem, renderTodoList}

const todoListStore = [];

const EMPTY_STRING = "";

function createTodoItem(id, title = EMPTY_STRING) {
    return {id: `i-${id}`, title: title}
}

function addTodoItem(id, title = EMPTY_STRING) {
    todoListStore.push(createTodoItem(id, title));
    renderTodoList();
}

function updateTodoItem(id, insert = EMPTY_STRING) {
    if (todoListStore.some(item => item.id === id)) {
        todoListStore.find(item => item.id === id).title = insert;
        renderTodoList();
    } else {
        throw `${id}라는 ID를 가진 요소가 없습니다!`;
    }
}

function removeTodoItem(id) {
    const index = todoListStore.findIndex(item => item.id === id);
    if (index !== -1) {
        todoListStore.splice(index, 1);
    } else {
        throw `${id}라는 ID를 가진 요소가 없습니다!`;
    }
    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.querySelector(".todo-list");
    todoListElement.innerHTML = EMPTY_STRING;

    todoListStore.forEach(
        item => {
            console.log(item);
            todoListElement.insertAdjacentHTML("beforeend", itemTemplate(item.id, item.title));
        }
    )
}

