export default function Todos() {
    this.todos = [];
}

Todos.prototype.push = function(todo) {
    this.todos.push(todo);
}

Todos.prototype.checkById = function(id) {
    this.todos.filter(todo => todo.id === id).forEach(todo => todo.check());
}

Todos.prototype.removeById = function(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
}

Todos.prototype.editById = function(id) {
    this.todos.filter(todo => todo.id === id).forEach(todo => todo.edit());
}

Todos.prototype.changeTodoItemById = function(id, newTodoItem) {
    this.todos.filter(todo => todo.id === id).forEach(todo => todo.changeTodoItem(newTodoItem));
}

Todos.prototype.undoToEditById = function(id) {
    this.todos.filter(todo => todo.id === id).forEach(todo => todo.undoToEdit());
}

Todos.prototype.count = function() {
    return this.todos.length;
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