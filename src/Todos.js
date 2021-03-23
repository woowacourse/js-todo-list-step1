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
    this.todos.filter(todo => todo.id === id).forEach(todo => todo.check())
}

Todos.prototype.removeById = function(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
}