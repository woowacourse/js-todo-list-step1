
function TodoInput({$target}) {

    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = `<input
                id="new-todo-title"
                class="new-todo"
                placeholder="할일을 추가해주세요"
                autofocus
        />`;
    }

    this.init();
}

export default TodoInput;
