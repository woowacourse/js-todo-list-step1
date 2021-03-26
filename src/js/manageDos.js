import {checkToDos} from "./completeToDo.js";
import {deleteToDo} from "./deleteToDo.js";
import {editToDos} from "./editToDo.js";
import {countDo} from "./countDo.js";
import {showConditions} from "./showDoCondition.js";

window.onload = function(){
    const $entireToDo = document.getElementById("todo-list");;
    checkToDos($entireToDo);
    deleteToDo($entireToDo);
    editToDos($entireToDo);
    countDo();
    showConditions();
};