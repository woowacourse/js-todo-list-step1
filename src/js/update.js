const TODO_INPUT_BOX = document.getElementById('new-todo-title');
const TODO_LIST_BOX = document.getElementById('todo-list');
const TODO_ITEM_CLASSIFICATION_NAME = 'todo';
const EDITING_ITEM_CLASSIFICATION_NAME = 'editing';
const COMPLETE_ITEM_CLASSIFICATION_NAME = 'completed';

function initiate() {
    updateVisibleTodoItemCounts();
    TODO_INPUT_BOX.addEventListener('keyup', addTodoItem);
}

function updateVisibleTodoItemCounts() {
    const allTodoItems = TODO_LIST_BOX.getElementsByTagName('li');
    let todoCounts = 0;
    for (let i = 0; i < allTodoItems.length; i++) {
        if (!allTodoItems.item(i).hidden) {
            todoCounts++;
        }
    }
    const todoCountBox = document.getElementsByClassName('todo-count').item(0);
    todoCountBox.innerHTML = "총 <strong>" + todoCounts + "</strong> 개";
}

function addTodoItem(event) {
    const inputItem = TODO_INPUT_BOX.value;
    if (event.key !== 'Enter' || inputItem === '') {
        return;
    }
    const todoItemNode = generateTodoItemNode(inputItem);
    TODO_LIST_BOX.appendChild(todoItemNode);
    updateVisibleTodoItemCounts();
    TODO_INPUT_BOX.value = '';
}

function generateTodoItemNode(inputItem) {
    const todoItemNode = document.createElement('li');
    todoItemNode.className = TODO_ITEM_CLASSIFICATION_NAME;
    todoItemNode.innerHTML = '<div class="view">\n' +
        '      <input class="toggle" type="checkbox"/>\n' +
        '      <label class="label">' + inputItem + '</label>\n' +
        '      <button class="destroy"></button>\n' +
        '    </div>\n' +
        '    <input class="edit" value="새로운 타이틀" />';
    addCompleteClickEvent(todoItemNode, COMPLETE_ITEM_CLASSIFICATION_NAME);
    addEditingClickEvent(todoItemNode);
    addDestroyClickEvent(todoItemNode);
    return todoItemNode;
}

function addCompleteClickEvent(todoItemNode, classificationName) {
    const checkBox = todoItemNode.getElementsByClassName('toggle').item(0);
    if (classificationName === TODO_ITEM_CLASSIFICATION_NAME) {
        todoItemNode.className = COMPLETE_ITEM_CLASSIFICATION_NAME;
        checkBox.checked = true;
        checkBox.addEventListener('click', function (event) {
            addCompleteClickEvent(todoItemNode, COMPLETE_ITEM_CLASSIFICATION_NAME);
        });
    }
    if (classificationName === COMPLETE_ITEM_CLASSIFICATION_NAME) {
        todoItemNode.className = TODO_ITEM_CLASSIFICATION_NAME;
        checkBox.checked = false;
        checkBox.addEventListener('click', function (event) {
            addCompleteClickEvent(todoItemNode, TODO_ITEM_CLASSIFICATION_NAME);
        });
    }
}

function addEditingClickEvent(todoItemNode) {
    todoItemNode.addEventListener('dblclick', function () {
        const beforeClassificationName = todoItemNode.className;
        const beforeTodoItem = todoItemNode.getElementsByClassName('label').item(0);
        const editedTodoItem = todoItemNode.getElementsByClassName('edit').item(0);
        todoItemNode.className = EDITING_ITEM_CLASSIFICATION_NAME;
        editedTodoItem.value = beforeTodoItem.textContent;
        todoItemNode.addEventListener('keyup', function (event) {
            if (event.key === 'Escape') {
                todoItemNode.className = beforeClassificationName;
                return;
            }
            if (event.key === 'Enter') {
                todoItemNode.className = beforeClassificationName;
                beforeTodoItem.textContent = editedTodoItem.value;
            }
        });
    });
}

function addDestroyClickEvent(todoItemNode) {
    const destroyButton = todoItemNode.getElementsByClassName('destroy').item(0);
    destroyButton.addEventListener('click', function () {
        TODO_LIST_BOX.removeChild(todoItemNode);
        updateVisibleTodoItemCounts();
    });
}

initiate();
