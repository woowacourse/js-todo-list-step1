
const enterToDoItem = () => {
    if (window.event.keyCode == 13) {
        const toDoParent = document.getElementById("todo-list");
        const toDoContent = document.getElementById("new-todo-title").value;
        const singleToDo = foamToDoSingle(toDoContent);
        toDoParent.appendChild(singleToDo);
        checkToDos();
        deleteToDos();
    }
}

const foamToggleInput = () => {
    const elementCheckBox = document.createElement("input");
    elementCheckBox.setAttribute("class", "toggle");
    elementCheckBox.setAttribute("type", "checkbox");

    return elementCheckBox;
}

const foamLabel = (newTitle) => {
    const elementLabel = document.createElement("label");
    elementLabel.setAttribute("class", "label");
    elementLabel.innerHTML = newTitle;

    return elementLabel;
}

const foamButton = () => {
    const elementButton = document.createElement("button");
    elementButton.setAttribute("class", "destroy");

    return elementButton;
}

const foamViewDiv = (newTitle) => {
    const elementViewDiv = document.createElement("div");
    
    elementViewDiv.setAttribute("class", "view");
    elementViewDiv.appendChild(foamToggleInput());
    elementViewDiv.appendChild(foamLabel(newTitle));
    elementViewDiv.appendChild(foamButton());

    return elementViewDiv;
}

const foamInputEdit = (newTitle) => {
    const elementInputEdit = document.createElement("input");
    elementInputEdit.setAttribute("class", "edit");
    elementInputEdit.setAttribute("value", newTitle);

    return elementInputEdit;
}

const foamToDoSingle = (newTitle) => {
    const elementToDoSingle = document.createElement("li");
    elementToDoSingle.appendChild(foamViewDiv(newTitle));
    elementToDoSingle.appendChild(foamInputEdit(newTitle));

    return elementToDoSingle;
}