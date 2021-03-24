export default function Todos() {
    this.todos = [];
}

Todos.prototype.filterById = function(id) {
    return this.todos.filter(todo => todo.id === id);
}

Todos.prototype.push = function(todo) {
    this.todos.push(todo);
}

Todos.prototype.checkById = function(id) {
    this.filterById(id).forEach(todo => todo.check());
}

Todos.prototype.editById = function(id) {
    this.filterById(id).forEach(todo => todo.edit());
}

Todos.prototype.changeTodoItemById = function(id, newTodoItem) {
    this.filterById(id).forEach(todo => todo.changeTodoItem(newTodoItem));
}

Todos.prototype.undoToEditById = function(id) {
    this.filterById(id).forEach(todo => todo.undoToEdit());
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