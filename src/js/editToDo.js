const editToDos = () => {
    let editMarks = document.getElementsByClassName("label");

    Array.prototype.forEach.call(editMarks, function(editMark) {
        editMark.addEventListener('dblclick', clickEdit);
    })
}

const clickEdit = (event) => {
    const editElement = event.currentTarget.parentNode.parentNode
    editElement.setAttribute("class", "editing");
    const inputElement = editElement.getElementsByClassName("edit")[0];
    inputElement.addEventListener("keydown", cancelEdit);
    inputElement.addEventListener("keydown", edit);
}

const edit = (event) => {
    if(window.event.key == "Enter") {
        const changedContent = event.currentTarget.value;
        const targetContent = event.currentTarget.parentNode.getElementsByClassName("label")[0];
        targetContent.innerHTML = changedContent;
        event.currentTarget.parentNode.setAttribute("class","");
    }
}

const cancelEdit = (event) => {
    if (window.event.key == "Esc") {
        event.currentTarget.parentNode.setAttribute("class", "");
    }
}
