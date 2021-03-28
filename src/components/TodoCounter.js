function TodoCounter({$target}) {
    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = function () {
        this.$target.innerHTML = `<span class="todo-count">총 <strong>0</strong> 개</span>`;
    }

    this.init();
}

export default TodoCounter;
