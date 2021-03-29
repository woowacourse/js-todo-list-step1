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

    this.addChangeTodoState = event => {
        const clickedClassName = event.target.className;
        if (clickedClassName !== 'destroy' && clickedClassName !== 'toggle') {
            return;
        }

        if (clickedClassName === 'toggle') {
            this.toggleTodoItem(event);
            return;
        }

        if (clickedClassName === 'destroy') {
            const clickedTodo = event.target.offsetParent;
            this.removeTodo(Number.parseInt(clickedTodo.id));
            clickedTodo.remove();
        }
    };

    this.addEditModeEvent = event => {
        const clickedTodoState = event.target.offsetParent.className;
        if (clickedTodoState === "editing" || clickedTodoState === "completed") {
            return;
        }

        event.target.offsetParent.classList.add('editing');
    };

    this.addCancelAndCompleteEditMode = event => {
        const dblClickedTodoItem = event.target.offsetParent;
        if (!dblClickedTodoItem.classList.contains("editing")) {
            return;
        }

        if (event.key === 'Escape') {
            dblClickedTodoItem.classList.remove("editing");
            return;
        }

        if (event.key === 'Enter') {
            const editedTodoId = event.target.offsetParent.id;
            const newTodoTitle = event.target.value;
            this.editTodo(parseInt(editedTodoId), newTodoTitle);
            const todoTitle = event.target;
            todoTitle.innerText = newTodoTitle;
            dblClickedTodoItem.classList.remove("editing");
        }
    };

    this.toggleTodoItem = event => {
        const toggledId = event.target.offsetParent.id;
        this.toggleTodo(toggledId);
        event.target.classList.toggle("completed");
    }

    this.setState = (updatedState) => {
        this.state = updatedState;

        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = this.state.todos
            .map(todo => this.translateTemplate(todo))
            .join("");
    };

    this.translateTemplate = todo => `<li id="${todo.id}" class="${todo.done ? "completed" : ""}">
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
