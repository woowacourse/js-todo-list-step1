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
    }

    this.addChangeTodoState = (evt) => {
        const clickedClassName = evt.target.className;
        if (clickedClassName !== 'destroy' && clickedClassName !== 'toggle') {
            return;
        }

        if (clickedClassName === 'toggle') {
            this.toggleTodoItem(evt);
        }

        // todo: 수정기능! (추가할 경우 위의 기능은 early return 시키기!)

        // todo: 삭제기능!
    }

    this.toggleTodoItem = evt => {
        const clickedTodoState = evt.target.offsetParent.classList;
        if (evt.target.checked === true) {
            clickedTodoState.add("completed");
            return;
        }

        clickedTodoState.remove("completed");
    }

    this.addNewTodoItem = (newTitle) => {
        this.$target.innerHTML += `<li>
                            <div id="${newTitle.id}" class="view">
                                <input class="toggle" type="checkbox"/>
                                <label class="label">${newTitle.title}</label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="새로운 타이틀" />
                        </li>`
    }

    this.init();
}

export default TodoList;
