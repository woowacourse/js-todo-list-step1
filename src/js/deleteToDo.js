import {countDo} from "./countDo.js";

export const deleteToDo = ($entireToDo) => {
    $entireToDo.addEventListener("click", function(e) {
        if (e.target && e.target.className == "destroy"){
            clickXMark(e);
        }
    })
}

const clickXMark = (event) => {
    event.target.parentNode.parentNode.remove();
    countDo();
}