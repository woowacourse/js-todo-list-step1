export default function Todo(title) {
    this.title = title;
    this.isChecked = false;
    this.isEditing = false;
    this.id = Date.now().toString();
}

Todo.prototype.check = function() {
    this.isChecked = true;
}

Todo.prototype.edit = function() {
    this.isEditing = true;
}

Todo.prototype.changeTodoItem = function(title) {
    this.title = title;
    this.undoToEdit();
}

Todo.prototype.undoToEdit = function() {
    this.isEditing = false;
}