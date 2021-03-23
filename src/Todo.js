export default function Todo(title) {
    this.title = title;
    this.isChecked = false;
    this.id = Date.now().toString();
}

const todoTemplate = (todo) => {
    return `<li ${todo.isChecked ? `class = "completed"` : ``}>
        <div class="view">
            <input id=${todo.id} class="toggle" type="checkbox" ${todo.isChecked ? `checked` : ``}/>
            <label class="label">${todo.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}" />
    </li>`;
}

Todo.prototype.check = function() {
    this.isChecked = true;
}

Todo.prototype.html = function () {
    return todoTemplate(this);
}