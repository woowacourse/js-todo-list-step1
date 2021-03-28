function TodoCounter({$target, state}) {
    
    this.init = () => {
        this.$target = $target;
        this.state = state;
        this.render();
    }

    this.setState = (updateState) => {
        this.state = updateState;

        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `<span class="todo-count">총 <strong>${this.state.todos.length}</strong> 개</span>`;
    }

    this.init();
}

export default TodoCounter;
