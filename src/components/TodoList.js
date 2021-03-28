function TodoList({$target}) {

    this.init = () => {
        this.$target = $target;
        this.render();
        this.addEvents();
    }

    this.render = () => {

    }

    this.addEvents = () => {
        this.$target.addEventListener("click", this.addChangeTodoState);
        this.$target.addEventListener("dblclick", this.addEditModeEvent);
        this.$target.addEventListener("keydown", this.addCancelAndCompleteEditMode);
    }

    this.addChangeTodoState = evt => {
        const clickedClassName = evt.target.className;
        if (clickedClassName !== 'destroy' && clickedClassName !== 'toggle') {
            return;
        }

        if (clickedClassName === 'toggle') {
            this.toggleTodoItem(evt);
            return;
        }

        if (clickedClassName === 'destroy') {
            const clickedTodo = evt.target.offsetParent;
            clickedTodo.remove();
        }
    };

    this.addEditModeEvent = evt => {
        const clickedTodoState = evt.target.offsetParent.className;
        if (clickedTodoState === "editing" || clickedTodoState === "completed") {
            return;
        }

        evt.target.offsetParent.classList.add('editing');
    };

    this.addCancelAndCompleteEditMode = evt => {
        const dblClickedTodoItem = evt.target.offsetParent;
        if (evt.key === 'Escape') {
            dblClickedTodoItem.classList.remove("editing");
            return;
        }

        if (evt.key === 'Enter') {
            const todoTitle = evt.target.offsetParent.firstElementChild.children[1];
            const inputNewTodoTitle = evt.target.value;
            todoTitle.innerText = inputNewTodoTitle;
            dblClickedTodoItem.classList.remove("editing");
        }
    };

    this.toggleTodoItem = evt => {
        const clickedTodoState = evt.target.offsetParent.classList;
        if (evt.target.checked === true) {
            clickedTodoState.add("completed");
            return;
        }

        clickedTodoState.remove("completed");
    }

    this.addNewTodoItem = newTitle => {
        this.$target.innerHTML += `<li>
                            <div id="${newTitle.id}" class="view">
                                <input class="toggle" type="checkbox"/>
                                <label class="label">${newTitle.title}</label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="${newTitle.title}" />
                        </li>`
    }

    this.init();
}

export default TodoList;
