export const editToDos = ($entireToDo) => {
    $entireToDo.addEventListener("dblclick", function(e) {
        if (e.target && e.target.className == "label"){
            clickEdit(e);
        }
    })
}

const clickEdit = (event) => {
    const $editElement = event.target.parentNode.parentNode;
    $editElement.setAttribute("class", "editing");
    const $inputElement = $editElement.getElementsByClassName("edit")[0];
    $inputElement.addEventListener("keydown", cancelEdit);
    $inputElement.addEventListener("keydown", edit);
}

const edit = (event) => {
    if(event.key == "Enter") {
        const $changedContent = event.target.value;
        const $targetContent = event.target.parentNode.getElementsByClassName("label")[0];
        $targetContent.innerHTML = $changedContent;
        event.target.parentNode.setAttribute("class","");
    }
}

const cancelEdit = (event) => {
    if (event.key == "Escape") {
        event.target.parentNode.setAttribute("class", "");
    }
}
