window.onload = printVisibleCount;

function count(items) {
    let visibleCount = 0;
    Array.from(items).forEach((el) => {
        if (el.tagName === 'LI' && el.hidden === false) {
            visibleCount++;
        }
    });
    return visibleCount;
}

function printVisibleCount() {
    const activeItems = document.getElementsByClassName('todo');
    const completedItems = document.getElementsByClassName('completed');

    document.getElementById('count').innerHTML = "" + (count(activeItems) + count(completedItems));
}

function enterNewToDo() {
    return function (event) {
        if (event.keyCode === 13) {
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
            printVisibleCount();
        }
    }
}

function editingTitle() {
    return function (event) {
        if (event.target && event.target.classList.contains('label')) {
            const item = event.target.closest('.todo');
            item.className = 'editing';
        }
    }
}

function setEditedTitle() {
    return function (event) {
        if (event.keyCode !== 13 && event.target.closest('.editing')) {
            return;
        }

        const editedLabelValue = event.target.value;
        const view = event.target.previousSibling; // hard

        Array.from(view.children).forEach((el) => {
            if (el.classList.contains('label')) {
                el.innerText = editedLabelValue;
            }
        });

        event.target.closest('.editing').className = 'todo';
    }
}

function remove() {
    return function (event) {
        if (event.target && !event.target.classList.contains('destroy')) {
            return;
        }
        event.target.closest("li").remove();
    }
}

function checkIsDone() {
    return function (event) {
        if (event.target && !event.target.classList.contains('toggle')) {
            return;
        }

        if (event.target.checked == true) {
            event.target.closest("LI").className = 'completed';
            event.target.toggleAttribute('checked');
            return;
        }

        if (event.target.checked == false) {
            event.target.closest("LI").className = 'todo';
            event.target.removeAttribute('checked');
            return;
        }
    }
}


function decideMenuSelected(selectedMenu) {
    const filters = document.getElementsByClassName('filters')[0];

    Array.from(filters.children).forEach((el) => {
        const button = el.children[0];
        const buttonMenu = button.className.split(" ")[0];

        if (buttonMenu === selectedMenu) {
            button.classList.add('selected');
            return;
        }

        button.className = buttonMenu;
    });
}

function changeStatus() {
    return function (event) {
        const activeItems = document.getElementsByClassName('todo');
        const completedItems = document.getElementsByClassName('completed');

        if (!event.target) {
            return;
        }

        if (event.target.classList.contains('all')) {
            decideItemsVisible(activeItems, true);
            decideItemsVisible(completedItems, true);
        }

        if (event.target.classList.contains('active')) {
            decideItemsVisible(activeItems, true);
            decideItemsVisible(completedItems, false);
        }

        if (event.target.classList.contains('completed')) {
            decideItemsVisible(activeItems, false);
            decideItemsVisible(completedItems, true);
        }

        decideMenuSelected(event.target.className.split(" ")[0]);
        printVisibleCount();
    }
}

function decideItemsVisible(items, isVisible) {
    Array.from(items).forEach((el) => {
        if (el.tagName === 'LI') {
            el.hidden = !isVisible;
        }
    });
}

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

document.getElementsByClassName('filters').namedItem('status')
    .addEventListener('click', changeStatus());
