function addFilteringEvents() {
    document.getElementsByClassName('all selected').item(0)
        .addEventListener('click', function (event) {
            addFilteringEvent(event.target.className);
        });
    document.getElementsByClassName('active').item(0)
        .addEventListener('click', function (event) {
            addFilteringEvent(event.target.className);
        });
    document.getElementsByClassName('completed').item(0)
        .addEventListener('click', function (event) {
            addFilteringEvent(event.target.className);
        });
}

function addFilteringEvent(classificationName) {
    resetEditingItemsToOriginal();
    if (classificationName === 'all selected') {
        filterActiveAndCompletedTodoItemsBy(false, false);
    } else if (classificationName === 'active') {
        filterActiveAndCompletedTodoItemsBy(false, true);
    } else if (classificationName === 'completed') {
        filterActiveAndCompletedTodoItemsBy(true, false);
    }
    updateVisibleTodoItemCounts();
}

function resetEditingItemsToOriginal() {
    const editingItems = TODO_LIST_BOX.getElementsByClassName(EDITING_ITEM_CLASSIFICATION_NAME);
    for (let i = 0; i < editingItems.length; i++) {
        const editingItem = editingItems.item(i);
        const checkBox = editingItem.getElementsByClassName('toggle').item(0);
        if (checkBox.checked === true) {
            editingItem.className = COMPLETE_ITEM_CLASSIFICATION_NAME;
        } else {
            editingItem.className = TODO_ITEM_CLASSIFICATION_NAME;
        }
    }
}

function filterActiveAndCompletedTodoItemsBy(isActiveItemHidden, isCompletedItemHidden) {
    const activeTodoItems = TODO_LIST_BOX.getElementsByClassName('todo');
    const completedItems = TODO_LIST_BOX.getElementsByClassName('completed');
    for (let i = 0; i < activeTodoItems.length; i++) {
        activeTodoItems.item(i).hidden = isActiveItemHidden;
    }
    for (let i = 0; i < completedItems.length; i++) {
        completedItems.item(i).hidden = isCompletedItemHidden;
    }
}

addFilteringEvents();

