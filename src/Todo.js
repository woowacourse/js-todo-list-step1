export default function Todo(title) {
    this.title = title;
}

const todoTemplate = (todo) => {
    return `<li>
        <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${todo.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}" />
    </li>`;
}

Todo.prototype.title = function() {
    return this.title;
}

Todo.prototype.html = function () {
    return todoTemplate(this);
}