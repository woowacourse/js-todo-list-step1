export default function Todos() {
    this.todos = [];
}

Todos.prototype.findById = function(id) {
    return this.todos.find(todo => todo.id === id);
}

Todos.prototype.push = function(todo) {
    this.todos.push(todo);
}

Todos.prototype.checkById = function(id) {
    this.findById(id).check();
}

Todos.prototype.editById = function(id) {
    this.findById(id).edit();
}

Todos.prototype.changeTodoItemById = function(id, newTodoItem) {
    this.findById(id).changeTodoItem(newTodoItem);
}

Todos.prototype.undoToEditById = function(id) {
    this.findById(id).undoToEdit();
}

Todos.prototype.removeById = function(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
}

Todos.prototype.allTodos = function() {
    return this.todos;
}

Todos.prototype.activeTodos = function() {
    return this.todos.filter(todo => !todo.isChecked);
}

Todos.prototype.completedTodos = function() {
    return this.todos.filter(todo => todo.isChecked);
}