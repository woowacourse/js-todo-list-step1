export default function Todo(title) {
    this.title = title;
    this.isChecked = false;
    this.isEditing = false;
    this.id = Date.now().toString();
}

const todoTemplate = (todo) => {
    return `<li id=${todo.id} class ="${todo.isChecked ? `completed` : ``} ${todo.isEditing ? `editing` : ``}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.isChecked ? `checked` : ``}/>
            <label class="label">${todo.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.title}" />
    </li>`;
}

Todo.prototype.check = function() {
    this.isChecked = true;
}

Todo.prototype.edit = function() {
    this.isEditing = true;
}

Todo.prototype.html = function () {
    return todoTemplate(this);
}

Todo.prototype.changeTodoItem = function(title) {
    this.title = title;
    this.isEditing = false;
}

Todo.prototype.undoToEdit = function() {
    this.isEditing = false;
}