function TodoList({$target, todoInput}) {

    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '<ul id="todo-list" class="todo-list">' +
            '            <li>' +
            '                <div class="view">' +
            '                    <input class="toggle" type="checkbox"/>' +
            '                    <label class="label">새로운 타이틀</label>' +
            '                    <button class="destroy"></button>' +
            '                </div>' +
            '                <input class="edit" value="새로운 타이틀" />' +
            '            </li>' +
            '            <li class="editing">' +
            '                <div class="view">' +
            '                    <input class="toggle" type="checkbox" />' +
            '                    <label class="label">완료된 타이틀</label>' +
            '                    <button class="destroy"></button>' +
            '                </div>' +
            '                <input class="edit" value="완료된 타이틀" />' +
            '            </li>' +
            '            <li class="completed">' +
            '                <div class="view">' +
            '                    <input class="toggle" type="checkbox" checked/>' +
            '                    <label class="label">완료된 타이틀</label>' +
            '                    <button class="destroy"></button>' +
            '                </div>' +
            '                <input class="edit" value="완료된 타이틀" />' +
            '            </li>' +
            '        </ul>';
    }

    this.addNewTodoItem = (newTitle) => {
        $target.innerHTML += `<li>
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
