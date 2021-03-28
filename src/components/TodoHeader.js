function TodoHeader({$target}) {

    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = function () {
        this.$target.innerHTML = `<h1>Roki's TODOS</h1>`;
    }

    this.init();
}

export default TodoHeader;