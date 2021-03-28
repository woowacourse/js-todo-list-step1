function TodoList({$target}) {

    this.init = () => {
        this.$target = $target;
        this.render();
    }

    this.render = () => {
        this.$target.innerHTML = '<ul id="todo-list" class="todo-list">\n' +
            '            <li>\n' +
            '                <div class="view">\n' +
            '                    <input class="toggle" type="checkbox"/>\n' +
            '                    <label class="label">새로운 타이틀</label>\n' +
            '                    <button class="destroy"></button>\n' +
            '                </div>\n' +
            '                <input class="edit" value="새로운 타이틀" />\n' +
            '            </li>\n' +
            '            <li class="editing">\n' +
            '                <div class="view">\n' +
            '                    <input class="toggle" type="checkbox" />\n' +
            '                    <label class="label">완료된 타이틀</label>\n' +
            '                    <button class="destroy"></button>\n' +
            '                </div>\n' +
            '                <input class="edit" value="완료된 타이틀" />\n' +
            '            </li>\n' +
            '            <li class="completed">\n' +
            '                <div class="view">\n' +
            '                    <input class="toggle" type="checkbox" checked/>\n' +
            '                    <label class="label">완료된 타이틀</label>\n' +
            '                    <button class="destroy"></button>\n' +
            '                </div>\n' +
            '                <input class="edit" value="완료된 타이틀" />\n' +
            '            </li>\n' +
            '        </ul>';
    }

    this.init();
}

export default TodoList;
