document.getElementById('todo-title')
    .addEventListener('dblclick', editingTitle());

document.getElementById('todo-title')
    .addEventListener('keypress', setEditedTitle());

document.getElementById('todo-title')
    .addEventListener('click', checkIsDone());

document.getElementById('todo-title')
    .addEventListener('click', remove());

document.getElementById('new-todo-title')
    .addEventListener('keypress', enterNewToDo());

function enterNewToDo() {
    return function (event) {
        if(event.keyCode === 13){
            const newWork = document.getElementById("new-todo-title").value;
            document.getElementById("new-todo-title").value = "";

            const li = document.createElement("li");
            const viewDiv = document.createElement("div");
            const editInput = document.createElement("input");
            const toggleBox = document.createElement("input");
            const labelLabel = document.createElement("label");
            const destroyButton = document.createElement("button");

            li.className = "todo";
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
            console.log("enter new : " + newWork);
        }
    }
}

function editingTitle() {
    return function (event) {
        if (event.target && event.target.className === 'label') {
            event.target.parentNode.parentNode.className = 'editing';
            console.log("turn to editing");
        }
    }
}

function setEditedTitle() {
    return function (event) {
        if (event.keyCode === 13) {
            if(event.target.parentNode.className === 'editing'){
                event.target.parentNode.className = 'todo';
                const label = event.target.previousSibling.childNodes[1];
                label.innerText = event.target.value;
                console.log("set editing title");
            }
        }
    }
}

function remove() {
    return function (event) {
        if(event.target && event.target.className !== 'destroy') {
            return;
        }
        event.target.closest("li").remove();
    }
}

function checkIsDone(){
    return function(event){
        if(event.target && event.target.className !== 'toggle') {
            return;
        }

        if(event.target.checked == true){
            event.target.parentNode.parentNode.className = 'completed';
            event.target.toggleAttribute('checked');
            return;
        }

        if(event.target.checked == false){
            event.target.parentNode.parentNode.className = 'todo';
            event.target.removeAttribute('checked');
            return;
        }
    }
}