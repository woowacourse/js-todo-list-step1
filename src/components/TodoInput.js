let id = 1;

function TodoInput({$target, todoList}) {

    this.init = () => {
        this.$target = $target;
        this.render();
        this.addEnterEvent();
    }

    this.render = () => {
        this.$target.innerHTML = `<input
                id="new-todo-title"
                class="new-todo"
                placeholder="할일을 추가해주세요"
                autofocus
        />`;
    }

    this.addEnterEvent = () => {
        this.$target.addEventListener('keydown', (evt) => {
            if (evt.key != 'Enter') {
                return;
            }

            const newTitle = evt.target.value;
            if ('' === newTitle) {
                alert("할 일을 입력해주세요!");
                return;
            }

            const newTodoItem = {
                id: id++,
                title: newTitle,
                done: false
            };

            todoList.addNewTodoItem(newTodoItem);
            evt.target.value = '';
        });
    }

    this.init();
}

export default TodoInput;
