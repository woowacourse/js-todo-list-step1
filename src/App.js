import addItem from "./todo/AddItem.js";
import checkItem from "./todo/CheckItem.js"

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

$todoInput.addEventListener("keyup", addItem.onAddTodoItem);
$todoList.addEventListener("mouseup", checkItem.onCheckToDoItem);





