function TodoList({$target, state, removeTodo, toggleTodo, editTodo}) {

    this.init = () => {
        this.$target = $target;
        this.state = state;
        this.removeTodo = removeTodo;
        this.toggleTodo = toggleTodo;
        this.editTodo = editTodo;

        this.addEvents();
        this.render();
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
            this.removeTodo(Number.parseInt(clickedTodo.id));
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
        if (!dblClickedTodoItem.classList.contains("editing")) {
            return;
        }

        if (evt.key === 'Escape') {
            dblClickedTodoItem.classList.remove("editing");
            return;
        }

        if (evt.key === 'Enter') {
            const editedTodoId = evt.target.offsetParent.id;
            const newTodoTitle = evt.target.value;
            this.editTodo(parseInt(editedTodoId), newTodoTitle);
            const todoTitle = evt.target;
            todoTitle.innerText = newTodoTitle;
            dblClickedTodoItem.classList.remove("editing");
        }
    };

    this.toggleTodoItem = evt => {
        const clickedTodoState = evt.target.offsetParent.classList;
        if (evt.target.checked === true) {
            const toggledId = evt.target.offsetParent.id;
            this.toggleTodo(toggledId);
            clickedTodoState.add("completed");
            return;
        }

        clickedTodoState.remove("completed");
    }

    this.setState = (updatedState) => {
        this.state = updatedState;

        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = this.state.todos
            .map(todo => this.translateTemplate(todo)).join("");
    };

    this.translateTemplate = (todo) => `<li id="${todo.id}" class="${todo.done ? "completed" : ""}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.done ? "checked" : ""}/>
        <label class="label">${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.title}" />
    </li>`

    this.init();
}

export default TodoList;
