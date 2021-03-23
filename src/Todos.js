export default function Todos() {
    this.todos = [];
}

Todos.prototype.push = function(todo) {
    this.todos.push(todo);
}

Todos.prototype.html = function() {
    var result = "";
    
    this.todos.forEach(todo =>
        result += todo.html()
    );
    return result;
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