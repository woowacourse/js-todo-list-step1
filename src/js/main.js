function enterNewToDo() {
    const newWork = document.getElementById("new-todo-title").value;
    document.getElementById("new-todo-title").value = "";

    const li = document.createElement("li");
    const viewDiv = document.createElement("div");
    const editInput = document.createElement("input");
    const toggleBox = document.createElement("input");
    const labelLabel = document.createElement("label");
    const destroyButton = document.createElement("button");

    viewDiv.className = "view";
    editInput.className = "edit";
    editInput.value = newWork;

    toggleBox.className = "toggle";
    toggleBox.type = "checkBox";
    labelLabel.className = "label";
    labelLabel.innerText = newWork;
    destroyButton.className = "destroy";

    li.appendChild(viewDiv);
    li.appendChild(editInput);

    viewDiv.appendChild(toggleBox);
    viewDiv.appendChild(labelLabel);
    viewDiv.appendChild(destroyButton);

    document.getElementById("todo-title").appendChild(li);
    console.log(newWork);
}