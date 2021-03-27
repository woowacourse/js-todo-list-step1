import addItem from "./todo/AddItem.js";
import checkItem from "./todo/CheckItem.js";
import editItem from "./todo/EditItem.js";
import filterItem from "./todo/filterItem.js";
import { EVENTS } from "./todo/constants.js";

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $filterList = document.querySelector(".filters");

$todoInput.addEventListener(EVENTS.KEY_UP, addItem.onAddTodoItem);
$todoList.addEventListener(EVENTS.MOUSE_UP, checkItem.onCheckToDoItem);
$todoList.addEventListener(EVENTS.DOUBLE_CLICK, editItem.onEditTodoItem);
$filterList.addEventListener(EVENTS.CLICK, filterItem.onFilterToDoItem);
